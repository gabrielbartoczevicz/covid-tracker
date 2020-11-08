import { City } from '@prisma/client';

import IFindCityByNameDTO from '@modules/locations/dtos/IFindCityByNameDTO';
import ICreateCityDTO from '@modules/locations/dtos/ICreateCityDTO';

export default interface ICitiesRepository {
  findByName(data: IFindCityByNameDTO): Promise<City | null>
  create(data: ICreateCityDTO): Promise<City>
}
