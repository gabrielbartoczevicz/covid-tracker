import { City } from '@prisma/client';

import IFindCitiesByIDDTO from '@modules/notifications/dtos/IFindCitiesByIDDTO';
import IFindCitiesByNameDTO from '@modules/notifications/dtos/IFindCitiesByNameDTO';
import IFindCitiesByStateIDDTO from '@modules/notifications/dtos/IFindCitiesByStateIDDTO';

export default interface ICitiesRepository {
  findByID(data: IFindCitiesByIDDTO): Promise<City | null>
  findByName(data: IFindCitiesByNameDTO): Promise<City[]>
  findByStateID(data: IFindCitiesByStateIDDTO): Promise<City[]>
}
