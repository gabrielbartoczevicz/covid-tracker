import 'reflect-metadata';

import { info, error } from '@shared/logger';

import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';
import '@shared/container';

import GetNotificationsFromFileService from '@modules/notifications/services/GetNotificationsFromFileService';

class App {
  public async run(): Promise<void> {
    const getNotificationsFromFile = new GetNotificationsFromFileService();

    try {
      const data = await getNotificationsFromFile.execute();

      const index = Math.round(data.length / 2);

      info(String(index));

      info(JSON.stringify(data[index]));

      data.forEach((d) => {
        const {
          estado: state,
          municipio: city,
          data: date,
          semanaepi: epi_week,
          casosnovos: notifications,
          obitosnovos: deaths,
          recuperadosnovos: recovered,
        } = d;

        info(JSON.stringify({
          state, city, date, epi_week, notifications, deaths, recovered,
        }));
      });
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
