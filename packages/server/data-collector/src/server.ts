import 'reflect-metadata';

import '@shared/container';

import { container } from 'tsyringe';

import CreateNotificationsService from '@modules/PopulateData/services/CreateNotificationsService';

const createNotifications = container.resolve(CreateNotificationsService);

createNotifications.execute();
