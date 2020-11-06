import { getRepository, Repository } from 'typeorm';

import IStatesRepository from '@modules/notification/repositories/IStatesRepository';
import ICreateStateDTO from '@modules/notification/dtos/ICreateStateDTO';
import IFindStateByNameDTO from '@modules/notification/dtos/IFindStateByNameDTO';
import State from '@modules/notification/infra/typeorm/entities/State';

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
