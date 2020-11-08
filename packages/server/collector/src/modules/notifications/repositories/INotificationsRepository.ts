import { Notification } from '@prisma/client';

import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}
