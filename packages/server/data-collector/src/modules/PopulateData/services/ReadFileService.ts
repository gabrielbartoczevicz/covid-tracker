import { inject, injectable } from 'tsyringe';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';

import IFileNameProvider from '@shared/container/providers/FileNameProvider/models/IFIleNameProvider';
import IFileDataDTO from '@modules/PopulateData/dtos/IFileDataDTO';

@injectable()
class ReadFileService {
  private fileNameProvider: IFileNameProvider;

  constructor(
    @inject('FileNameProvider') fileNameProvider: IFileNameProvider,
  ) {
    this.fileNameProvider = fileNameProvider;
  }

  public async execute(): Promise<IFileDataDTO[]> {
    const fileName = this.fileNameProvider.generate({ name: 'dados-gov' });

    const csvPath = path.resolve(__dirname, '..', '..', '..', '..', 'tmp', 'uploads', fileName);

    const csvReadStream = fs.createReadStream(csvPath, { encoding: 'latin1' });

    const parser = csv({
      separator: ';',
      mapHeaders: ({ header }) => header.toLowerCase().replace('ÿ', ''),
    });

    const parsedCsv = csvReadStream.pipe(parser);

    const data: IFileDataDTO[] = [];

    parsedCsv.on('data', async (line: IFileDataDTO) => {
      data.push(line);
    });

    await new Promise((resolve) => parsedCsv.on('end', resolve));

    return data;
  }
}

export default ReadFileService;
