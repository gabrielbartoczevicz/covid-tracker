/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import 'reflect-metadata';
import { container } from 'tsyringe';

import '@shared/container';

import { info, error } from '@shared/logger';
import AppError from '@shared/errors/AppError';

import GetNotificationsFromFileService from '@modules/notifications/services/GetNotificationsFromFileService';
import CreateStatesService from '@modules/locations/services/CreateStatesService';
import CreateCitiesService from '@modules/locations/services/CreateCitiesService';
import CreateNotificationsService from '@modules/notifications/services/CreateNotificationsService';

const getNotificationsFromFile = new GetNotificationsFromFileService();
const createState = container.resolve(CreateStatesService);
const createCity = container.resolve(CreateCitiesService);
const createNotifications = container.resolve(CreateNotificationsService);

async function run(): Promise<void> {
  try {
    const data = await getNotificationsFromFile.execute();

    for (const n of data) {
      const { id: state_id } = await createState.execute({ name: n.estado });

      const { id: city_id } = await createCity.execute({ name: n.municipio, state_id });

      await createNotifications.execute({
        city_id,
        date: new Date(n.data),
        epi_week: Number(n.semanaepi),
        notifications: Number(n.casosnovos),
        deaths: Number(n.obitosnovos),
        recovered: Number(n.recuperadosnovos),
      });
    }
  } catch (err) {
    if (err instanceof AppError) {
      error(err.message);
    }
  } finally {
    info('File read finished');
  }
}

export default run;
