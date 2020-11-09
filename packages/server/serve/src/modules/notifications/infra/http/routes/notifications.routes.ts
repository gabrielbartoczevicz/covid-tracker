import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import FindNotificationsController from '@modules/notifications/infra/http/controllers/FindNotificationsController';

const notificationsRoutes = Router();

const findNotificationsController = new FindNotificationsController();

notificationsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      state_name: Joi.string().allow(null),
      city_name: Joi.string().allow(null),
      interval: {
        start: Joi.string().isoDate().required(),
        end: Joi.string().isoDate().required(),
      },
    },
  }),
  findNotificationsController.execute,
);

export default notificationsRoutes;
