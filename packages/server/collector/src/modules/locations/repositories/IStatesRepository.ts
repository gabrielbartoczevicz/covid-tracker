import { State } from '@prisma/client';

import ICreateStateDTO from '@modules/locations/dtos/ICreateStateDTO';
import IFindStateByNameDTO from '@modules/locations/dtos/IFindStateByNameDTO';

export default interface IStatesRepository {
  findByName(data: IFindStateByNameDTO): Promise<State | null>
  create(data: ICreateStateDTO): Promise<State>
}
