import { getRepository, Repository } from 'typeorm';

import ICitiesRepository from '@modules/locations/repositories/ICitiesRepository';
import IFindCityByNameDTO from '@modules/locations/dtos/IFindCityByNameDTO';
import ICreateCityDTO from '@modules/locations/dtos/ICreateCityDTO';
import City from '@modules/locations/infra/typeorm/entities/City';

class CitiesRepository implements ICitiesRepository {
  private repository: Repository<City>;

  constructor() {
    this.repository = getRepository(City);
  }

  public async findByName({ name }: IFindCityByNameDTO): Promise<City | null> {
    const city = await this.repository.findOne({
      where: name,
    });

    return city || null;
  }

  public async create(data: ICreateCityDTO): Promise<City> {
    const city = this.repository.create(data);

    await this.repository.save(city);

    return city;
  }
}

export default CitiesRepository;
