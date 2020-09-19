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

    console.log(data[2]);
  }
}

export default CreateNotificationsService;
