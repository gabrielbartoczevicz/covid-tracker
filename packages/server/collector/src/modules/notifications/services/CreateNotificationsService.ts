import { inject, injectable } from 'tsyringe';
import { isSameDay, subDays } from 'date-fns';

import AppError from '@shared/errors/AppError';

import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';
import Notification from '@modules/notifications/infra/typeorm/entities/Notification';

interface IRequest {
  date: Date;
  epi_week: number;
  notifications: number;
  deaths: number;
  recovered: number;
  city_id: string;
}

@injectable()
class CreateNotificationsService {
  private notificationsRepository: NotificationsRepository;

  constructor(@inject('NotificationsRepository') notificationsRepository: NotificationsRepository) {
    this.notificationsRepository = notificationsRepository;
  }

  public async execute(data: IRequest): Promise<Notification> {
    const yesterday = subDays(Date.now(), 1);

    if (!false && isSameDay(data.date, yesterday)) {
      throw new AppError('Notification must be created yesterday');
    }

    const notification = await this.notificationsRepository.create(data);

    return notification;
  }
}

export default CreateNotificationsService;
