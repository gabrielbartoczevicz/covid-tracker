import ICreateStateDTO from '@modules/notification/dtos/ICreateStateDTO';
import IFindStateByNameDTO from '@modules/notification/dtos/IFindStateByNameDTO';
import State from '@modules/notification/infra/typeorm/entities/State';

export default interface IStatesRepository {
  findByName(data: IFindStateByNameDTO): Promise<State | null>
  create(data: ICreateStateDTO): Promise<State>
}
