import { inject, injectable } from 'tsyringe';
import { isAfter } from 'date-fns';

import { Notification } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ICitiesRepository from '@modules/notifications/repositories/ICitiesRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import IStatesRepository from '@modules/notifications/repositories/IStatesRepository';

interface IRequest {
  state_name?: string;
  city_name?: string;
  interval: {
    start: Date;
    end: Date;
  }
}

interface IResponse {
  notifications: number;
  deaths: number;
  recovered: number;
}

@injectable()
class FindNotificationsService {
  private notificationsRepository: INotificationsRepository;

  private citiesRepository: ICitiesRepository;

  private statesRepository: IStatesRepository;

  constructor(
    @inject('NotificationsRepository') notificationsRepository: INotificationsRepository,
    @inject('CitiesRepository') citiesRepository: ICitiesRepository,
    @inject('StatesRepository') statesRepository: IStatesRepository,
  ) {
    this.notificationsRepository = notificationsRepository;
    this.citiesRepository = citiesRepository;
    this.statesRepository = statesRepository;
  }

  public async execute({ state_name, city_name, interval }: IRequest): Promise<IResponse> {
    if (!state_name && !city_name) {
      throw new AppError('State or city must be provided', 422);
    }

    const { start, end } = interval;

    const now = Date.now();

    if (isAfter(now, start)) {
      throw new AppError('Start date must be before now date', 422);
    }

    if (isAfter(now, end)) {
      throw new AppError('End date must be before now date', 422);
    }

    let notifications: Notification[] = [];

    if (state_name) {
      const state = await this.statesRepository.findByName({ name: state_name });

      if (!state) {
        throw new AppError('State not found', 422);
      }

      const cities = await this.citiesRepository.findByStateID({
        state_id: state.id,
      });

      notifications = await this.notificationsRepository.findByCitiesIDAndDateInterval({
        cities_id: cities.map(({ id }) => id),
        interval,
      });
    }

    if (city_name) {
      const cities = await this.citiesRepository.findByName({ name: city_name });

      if (!cities) {
        throw new AppError('City not found', 422);
      }

      notifications = await this.notificationsRepository.findByCitiesIDAndDateInterval({
        cities_id: cities.map(({ id }) => id),
        interval,
      });
    }

    const count = notifications.reduce((acc, notification) => (
      {
        n: acc.n + notification.notifications,
        d: acc.d + notification.deaths,
        r: acc.r + notification.recovered,
      }
    ),
    { n: 0, d: 0, r: 0 });

    return {
      notifications: count.n,
      deaths: count.d,
      recovered: count.r,
    };
  }
}

export default FindNotificationsService;
