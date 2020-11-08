import 'reflect-metadata';

import { info, error } from '@shared/logger';

import AppError from '@shared/errors/AppError';

import '@shared/container';

import GetNotificationsFromFileService from '@modules/notifications/services/GetNotificationsFromFileService';
import { container } from 'tsyringe';
import CreateStatesService from '@modules/locations/services/CreateStatesService';
import CreateCitiesService from '@modules/locations/services/CreateCitiesService';

class App {
  public async run(): Promise<void> {
    const getNotificationsFromFile = new GetNotificationsFromFileService();
    const createState = container.resolve(CreateStatesService);
    const createCity = container.resolve(CreateCitiesService);

    try {
      const data = await getNotificationsFromFile.execute();

      const index = Math.round(data.length / 2);

      const n = data[index];

      info(JSON.stringify(n));

      const state = await createState.execute({ name: n.estado });

      info(JSON.stringify(state));

      const city = await createCity.execute({ name: n.municipio, state_id: state.id });

      info(JSON.stringify(city));
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
