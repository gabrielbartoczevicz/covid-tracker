import client from '@shared/infra/prisma/client';
import { Notification } from '@prisma/client';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

class NotificationsRepository implements INotificationsRepository {
  public async create(data: ICreateNotificationDTO): Promise<Notification> {
    const {
      date, city_id, epi_week, notifications, deaths, recovered,
    } = data;

    const notification = await client.notification.create({
      data: {
        city: {
          connect: {
            id: city_id,
          },
        },
        date,
        epiWeek: epi_week,
        notifications,
        deaths,
        recovered,
      },
    });

    return notification;
  }
}

export default NotificationsRepository;
