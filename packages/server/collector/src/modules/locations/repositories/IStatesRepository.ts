import ICreateStateDTO from '@modules/locations/dtos/ICreateStateDTO';
import IFindStateByNameDTO from '@modules/locations/dtos/IFindStateByNameDTO';
import State from '@modules/locations/infra/typeorm/entities/State';

export default interface IStatesRepository {
  findByName(data: IFindStateByNameDTO): Promise<State | null>
  create(data: ICreateStateDTO): Promise<State>
}
