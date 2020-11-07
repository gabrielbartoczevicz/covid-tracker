import { inject, injectable } from 'tsyringe';

import { warn, info } from '@shared/logger';

import ICitiesRepository from '@modules/locations/repositories/ICitiesRepository';
import City from '@modules/locations/infra/typeorm/entities/City';

interface IRequest {
  name: string;
  state_id: string;
}

@injectable()
class CreateCitiesService {
  private citiesRepository: ICitiesRepository;

  constructor(
    @inject('CitiesRepository') citiesRepository: ICitiesRepository,
  ) {
    this.citiesRepository = citiesRepository;
  }

  public async execute({ name, state_id }: IRequest): Promise<City> {
    let city = await this.citiesRepository.findByName({ name });

    if (city) {
      warn(`City ${city.name} already exists`);

      return city;
    }

    city = await this.citiesRepository.create({ name, state_id });

    info(`City ${city.id} - ${city.name} created`);

    return city;
  }
}

export default CreateCitiesService;
