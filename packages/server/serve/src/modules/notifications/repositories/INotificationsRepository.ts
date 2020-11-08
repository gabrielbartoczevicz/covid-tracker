import { Notification } from '@prisma/client';

import IFindNotificationsByCityIDDTO from '@modules/notifications/dtos/IFindNotificationsByCityIDDTO';

export default interface INotificationsRepository {
  findByCityID(data: IFindNotificationsByCityIDDTO): Promise<Notification[]>;
}
