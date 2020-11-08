import client from '@shared/infra/prisma/client';
import { Notification } from '@prisma/client';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import IFindNotificationsByCityIDDTO from '@modules/notifications/dtos/IFindNotificationsByCitiesIDAndDateIntervalDTO';

class NotificationsRepository implements INotificationsRepository {
  public async findByCitiesIDAndDateInterval(
    { cities_id, interval }: IFindNotificationsByCityIDDTO,
  ): Promise<Notification[]> {
    const notifications = await client.notification.findMany({
      where: {
        cityId: {
          in: cities_id,
        },
        AND: [
          {
            date: {
              gte: interval.start,
            },
          },
          {
            date: {
              lte: interval.end,

            },
          },
        ],
      },
    });

    return notifications;
  }
}

export default NotificationsRepository;
