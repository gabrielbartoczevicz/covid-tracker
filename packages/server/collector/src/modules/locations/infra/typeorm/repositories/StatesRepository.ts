import { getRepository, Repository } from 'typeorm';

import IStatesRepository from '@modules/locations/repositories/IStatesRepository';
import ICreateStateDTO from '@modules/locations/dtos/ICreateStateDTO';
import IFindStateByNameDTO from '@modules/locations/dtos/IFindStateByNameDTO';
import State from '@modules/locations/infra/typeorm/entities/State';

class StatesRepository implements IStatesRepository {
  private repository: Repository<State>;

  constructor() {
    this.repository = getRepository(State);
  }

  public async findByName({ name } : IFindStateByNameDTO): Promise<State | null> {
    const state = await this.repository.findOne({
      where: {
        name,
      },
    });

    return state || null;
  }

  public async create({ name }: ICreateStateDTO): Promise<State> {
    const state = this.repository.create({ name });

    await this.repository.save(state);

    return state;
  }
}

export default StatesRepository;
