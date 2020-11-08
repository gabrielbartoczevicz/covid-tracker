import client from '@shared/infra/prisma/client';
import { State } from '@prisma/client';

import IStatesRepository from '@modules/locations/repositories/IStatesRepository';
import ICreateStateDTO from '@modules/locations/dtos/ICreateStateDTO';
import IFindStateByNameDTO from '@modules/locations/dtos/IFindStateByNameDTO';

class StatesRepository implements IStatesRepository {
  public async findByName({ name } : IFindStateByNameDTO): Promise<State | null> {
    const state = await client.state.findFirst({
      where: {
        name,
      },
    });

    return state || null;
  }

  public async create({ name }: ICreateStateDTO): Promise<State> {
    const state = await client.state.create({ data: { name } });

    return state;
  }
}

export default StatesRepository;
