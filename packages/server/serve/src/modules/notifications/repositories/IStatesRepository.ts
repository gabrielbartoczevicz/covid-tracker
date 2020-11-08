import { State } from '@prisma/client';

import IFindStatesByNameDTO from '@modules/notifications/dtos/IFindStatesByNameDTO';

export default interface IStatesRepository {
  findByName(data: IFindStatesByNameDTO): Promise<State | null>
}
