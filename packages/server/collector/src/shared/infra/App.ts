import 'reflect-metadata';

import { error, info, warn } from '@shared/logger';

class App {
  public run(): void {
    warn('Is server running?');
    info('Server is running');
    error('Server is not running');
  }
}

export default new App().run;
