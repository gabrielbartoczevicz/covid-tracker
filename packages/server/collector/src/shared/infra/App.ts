import 'reflect-metadata';

import CronService from '@modules/notification/services/CronService';

class App {
  public run(): void {
    new CronService().execute();
  }
}

export default new App().run;
