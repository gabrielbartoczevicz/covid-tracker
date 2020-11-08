import client from '@shared/infra/prisma/client';
import { City } from '@prisma/client';

import ICitiesRepository from '@modules/notifications/repositories/ICitiesRepository';
import IFindCitiesByIDDTO from '@modules/notifications/dtos/IFindCitiesByIDDTO';
import IFindCitiesByNameDTO from '@modules/notifications/dtos/IFindCitiesByNameDTO';
import IFindCitiesByStateIDDTO from '@modules/notifications/dtos/IFindCitiesByStateIDDTO';

class CitiesRepository implements ICitiesRepository {
  public async findByID({ id }: IFindCitiesByIDDTO): Promise<City | null> {
    const city = await client.city.findOne({
      where: {
        id,
      },
    });

    return city || null;
  }

  public async findByName({ name }: IFindCitiesByNameDTO): Promise<City[]> {
    const cities = client.city.findMany({
      where: {
        name,
      },
    });

    return cities;
  }

  public async findByStateID({ state_id }: IFindCitiesByStateIDDTO): Promise<City[]> {
    const cities = client.city.findMany({
      where: {
        stateId: state_id,
      },
    });

    return cities;
  }
}

export default CitiesRepository;
