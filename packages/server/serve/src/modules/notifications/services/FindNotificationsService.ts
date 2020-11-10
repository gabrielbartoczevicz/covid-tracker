import { inject, injectable } from 'tsyringe';
import {
  isAfter, startOfDay,
} from 'date-fns';

import { Notification } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ICitiesRepository from '@modules/notifications/repositories/ICitiesRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import IStatesRepository from '@modules/notifications/repositories/IStatesRepository';

import { IMeta, INotifications } from '@modules/notifications/dtos/ISummaryNotificationsDTO';

interface IRequest {
  state_name?: string;
  city_name?: string;
  interval: {
    start: Date;
    end: Date;
  }
}

interface IResponse {
  meta: IMeta;
  notifications: INotifications;
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

    const now = startOfDay(Date.now());
    const compare_start = startOfDay(start);
    const compare_end = startOfDay(end);

    if (isAfter(compare_start, now)) {
      throw new AppError('Start date must be before now date', 422);
    }

    if (isAfter(compare_end, now)) {
      throw new AppError('End date must be before now date', 422);
    }

    let storedNotifications: Notification[] = [];

    if (state_name) {
      const state = await this.statesRepository.findByName({ name: state_name });

      if (!state) {
        throw new AppError('State not found', 422);
      }

      const cities = await this.citiesRepository.findByStateID({
        state_id: state.id,
      });

      storedNotifications = await this.notificationsRepository.findByCitiesIDAndDateInterval({
        cities_id: cities.map(({ id }) => id),
        interval,
      });
    }

    if (city_name) {
      const cities = await this.citiesRepository.findByName({ name: city_name });

      if (!cities) {
        throw new AppError('City not found', 422);
      }

      storedNotifications = await this.notificationsRepository.findByCitiesIDAndDateInterval({
        cities_id: cities.map(({ id }) => id),
        interval,
      });
    }

    const meta = storedNotifications.reduce((acc, { notifications, deaths, recovered }) => ({
      total_notifications: acc.total_notifications + notifications,
      total_deaths: acc.total_deaths + deaths,
      total_recovered: acc.total_recovered + recovered,
    }), {
      total_notifications: 0,
      total_deaths: 0,
      total_recovered: 0,
    });

    const notificationsFormatted = storedNotifications.map(
      ({
        date, notifications, deaths, recovered,
      }) => ({
        date, notifications, deaths, recovered,
      }),
    );

    return {
      meta,
      notifications: notificationsFormatted,
    };
  }
}

export default FindNotificationsService;
