import { inject, injectable } from 'tsyringe';
import ReadFileService from './ReadFileService';

@injectable()
class CreateNotificationsService {
  private readFileService: ReadFileService;

  constructor(@inject('ReadFileService') readFileService: ReadFileService) {
    this.readFileService = readFileService;
  }

  public async execute(): Promise<void> {
    const data = await this.readFileService.execute();

    const res = data.filter((element) => element?.municipio.toLowerCase() === 'londrina');

    const londrina = JSON.stringify(res);

    console.log(londrina);
  }
}

export default CreateNotificationsService;
