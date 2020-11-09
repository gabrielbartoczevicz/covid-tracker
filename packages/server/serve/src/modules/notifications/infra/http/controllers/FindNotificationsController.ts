import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindNotificationsService from '@modules/notifications/services/FindNotificationsService';

class FindNotificationsController {
  public async execute(request: Request, response: Response): Promise<Response> {
    const { state_name, city_name, interval } = request.body;

    const { start, end } = interval;

    const parsedInterval = {
      start: parseISO(start),
      end: parseISO(end),
    };

    const findNotifications = container.resolve(FindNotificationsService);

    const count = await findNotifications.execute({
      state_name,
      city_name,
      interval: parsedInterval,
    });

    return response.json(count);
  }
}

export default FindNotificationsController;
