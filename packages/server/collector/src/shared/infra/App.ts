import 'reflect-metadata';

import { info, error } from '@shared/logger';

import AppError from '@shared/errors/AppError';

import GetNotificationsFromFileService from '@modules/notifications/services/GetNotificationsFromFileService';

class App {
  public async run(): Promise<void> {
    const getNotificationsFromFile = new GetNotificationsFromFileService();

    try {
      const data = await getNotificationsFromFile.execute();

      const index = Math.round(data.length / 2);

      info(String(index));

      info(JSON.stringify(data[index]));
    } catch (e) {
      if (e instanceof AppError) {
        error(e.message);
      } else {
        error(e);
      }

      process.exit();
    }
  }
}

export default new App().run;
