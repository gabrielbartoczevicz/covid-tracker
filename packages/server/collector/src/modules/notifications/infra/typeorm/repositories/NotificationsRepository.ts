import { getRepository, Repository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notification from '@modules/notifications/infra/typeorm/entities/Notification';

class NotificationsRepository implements INotificationsRepository {
  private repository: Repository<Notification>;

  constructor() {
    this.repository = getRepository(Notification);
  }

  public async create(data: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.repository.create(data);

    await this.repository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
