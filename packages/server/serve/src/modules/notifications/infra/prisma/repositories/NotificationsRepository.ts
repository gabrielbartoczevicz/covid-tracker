import client from '@shared/infra/prisma/client';
import { Notification } from '@prisma/client';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import IFindNotificationsByCityIDDTO from '@modules/notifications/dtos/IFindNotificationsByCityIDDTO';

class NotificationsRepository implements INotificationsRepository {
  public async findByCityID({ city_id }: IFindNotificationsByCityIDDTO): Promise<Notification[]> {
    const notifications = await client.notification.findMany({
      where: {
        cityId: city_id,
      },
    });

    return notifications;
  }
}

export default NotificationsRepository;
