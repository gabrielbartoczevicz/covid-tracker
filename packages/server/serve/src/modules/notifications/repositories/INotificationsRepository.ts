import { Notification } from '@prisma/client';

import IFindNotificationsByCityIDAndDateIntervalDTO from '@modules/notifications/dtos/IFindNotificationsByCitiesIDAndDateIntervalDTO';

export default interface INotificationsRepository {
  findByCitiesIDAndDateInterval(
    data: IFindNotificationsByCityIDAndDateIntervalDTO
  ): Promise<Notification[]>;
}
