import client from '@shared/infra/prisma/client';
import { State } from '@prisma/client';

import IStatesRepository from '@modules/notifications/repositories/IStatesRepository';
import IFindStatesByNameDTO from '@modules/notifications/dtos/IFindStatesByNameDTO';

class StatesRepository implements IStatesRepository {
  public async findByName({ name }: IFindStatesByNameDTO): Promise<State | null> {
    const state = await client.state.findFirst({
      where: {
        name,
      },
    });

    return state || null;
  }
}

export default StatesRepository;
