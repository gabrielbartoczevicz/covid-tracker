import { Router } from 'express';

const routes = Router();

routes.post('/', (request, response) => response.json(request.body));

export default routes;
