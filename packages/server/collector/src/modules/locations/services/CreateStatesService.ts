import { inject, injectable } from 'tsyringe';

import { info, warn } from '@shared/logger';

import IStatesRepository from '@modules/locations/repositories/IStatesRepository';
import State from '@modules/locations/infra/typeorm/entities/State';

interface IRequest {
  name: string
}

@injectable()
class CreateStatesService {
  private statesRepository: IStatesRepository;

  constructor(@inject('StatesRepository') statesRepository: IStatesRepository) {
    this.statesRepository = statesRepository;
  }

  public async execute(data: IRequest): Promise<State> {
    let state = await this.statesRepository.findByName(data);

    if (state) {
      warn(`State ${state.name} already exists`);

      return state;
    }

    state = await this.statesRepository.create(data);

    info(`State ${state.id} - ${state.name} created`);

    return state;
  }
}

export default CreateStatesService;
