import IFileNameProviderDTO from '@shared/container/providers/FileNameProvider/dtos/IFileNameProviderDTO';

export default interface IFileNameProvider {
  generate(data: IFileNameProviderDTO): string;
}
