import 'reflect-metadata';

import { info, error } from '@shared/logger';

import AppError from '@shared/errors/AppError';

import '@shared/container';

import GetNotificationsFromFileService from '@modules/notifications/services/GetNotificationsFromFileService';
import { container } from 'tsyringe';
import CreateStatesService from '@modules/locations/services/CreateStatesService';

class App {
  public async run(): Promise<void> {
    const getNotificationsFromFile = new GetNotificationsFromFileService();
    const createState = container.resolve(CreateStatesService);

    try {
      const data = await getNotificationsFromFile.execute();

      const index = Math.round(data.length / 2);

      info(String(index));

      info(JSON.stringify(data[index]));

      const state = await createState.execute({ name: data[index].estado });

      info(JSON.stringify(state));
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
