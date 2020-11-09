import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';
import { errors as celebrateErrors } from 'celebrate';

import '@shared/container';
import routes from '@shared/infra/http/routes';

import errorsMiddleware from './middlewares/errorsMiddleware';

class App {
  public server: express.Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.errors();
  }

  private middlewares(): void {
    this.server.use(express.json());
  }

  private routes(): void {
    this.server.use(routes);
  }

  private errors(): void {
    this.server.use(celebrateErrors());
    this.server.use(errorsMiddleware);
  }
}

export default new App().server;
