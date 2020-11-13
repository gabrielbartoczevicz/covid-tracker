import client from '@shared/infra/prisma/client';
import { Notification } from '@prisma/client';
import { format } from 'date-fns';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import IFindNotificationsByCityIDDTO from '@modules/notifications/dtos/IFindNotificationsByCitiesIDAndDateIntervalDTO';

class NotificationsRepository implements INotificationsRepository {
  public async findByCitiesIDAndDateInterval(
    { cities_id, interval }: IFindNotificationsByCityIDDTO,
  ): Promise<Notification[]> {
    const citiesInArrayString = `'${cities_id.join("', '")}'`;

    const notifications = await client.$queryRaw<Notification[]>(
      `SELECT n.* 
         FROM notifications n
        WHERE n.city_id IN (${citiesInArrayString}) 
          AND n.date BETWEEN DATE('${format(interval.start, 'yyyy-MM-dd')}') AND DATE('${format(interval.end, 'yyyy-MM-dd')}')
        ORDER BY n.date;`,
    );

    return notifications;
  }
}

export default NotificationsRepository;
