import { Router } from 'express';

import notificationsRoutes from '@modules/notifications/infra/http/routes/notifications.routes';

const routes = Router();

routes.post('/', (request, response) => response.json(request.body));
routes.use('/notifications', notificationsRoutes);

export default routes;
