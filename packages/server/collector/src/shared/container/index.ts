import { container } from 'tsyringe';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/prisma/repositories/NotificationsRepository';

import ICitiesRepository from '@modules/locations/repositories/ICitiesRepository';
import CitiesRepository from '@modules/locations/infra/prisma/repositories/CitiesRepository';

import IStatesRepository from '@modules/locations/repositories/IStatesRepository';
import StatesRepository from '@modules/locations/infra/prisma/repositories/StatesRepository';

container.registerSingleton<INotificationsRepository>('NotificationsRepository', NotificationsRepository);
container.registerSingleton<ICitiesRepository>('CitiesRepository', CitiesRepository);
container.registerSingleton<IStatesRepository>('StatesRepository', StatesRepository);
