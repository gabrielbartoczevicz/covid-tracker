import client from '@shared/infra/prisma/client';
import { City } from '@prisma/client';

import ICitiesRepository from '@modules/locations/repositories/ICitiesRepository';
import IFindCityByNameDTO from '@modules/locations/dtos/IFindCityByNameDTO';
import ICreateCityDTO from '@modules/locations/dtos/ICreateCityDTO';

class CitiesRepository implements ICitiesRepository {
  public async findByName({ name }: IFindCityByNameDTO): Promise<City | null> {
    const city = await client.city.findFirst({
      where: {
        name,
      },
    });

    return city || null;
  }

  public async create({ name, state_id }: ICreateCityDTO): Promise<City> {
    const city = await client.city.create({
      data: {
        name,
        state: {
          connect: {
            id: state_id,
          },
        },
      },
    });

    return city;
  }
}

export default CitiesRepository;
