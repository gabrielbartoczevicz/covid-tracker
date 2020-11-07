import IFindCityByNameDTO from '@modules/locations/dtos/IFindCityByNameDTO';
import ICreateCityDTO from '@modules/locations/dtos/ICreateCityDTO';
import City from '@modules/locations/infra/typeorm/entities/City';

export default interface ICitiesRepository {
  findByName(data: IFindCityByNameDTO): Promise<City | null>
  create(data: ICreateCityDTO): Promise<City>
}
