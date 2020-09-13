import { inject, injectable } from 'tsyringe';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';

import IFileNameProvider from '@shared/container/providers/FileNameProvider/models/IFIleNameProvider';

@injectable()
class ReadFileService {
  private fileNameProvider: IFileNameProvider;

  constructor(
    @inject('FileNameProvider') fileNameProvider: IFileNameProvider,
  ) {
    this.fileNameProvider = fileNameProvider;
  }

  public async execute(): Promise<void> {
    const fileName = this.fileNameProvider.generate('dados-gov');

    const csvPath = path.resolve(__dirname, '..', 'tmp', 'uploads', `${fileName}.csv`);

    const csvReadStream = fs.createReadStream(csvPath, { encoding: 'latin1' });

    const parser = csv({
      separator: ';',
      mapHeaders: ({ header }) => header.toLowerCase().replace('ÿ', ''),
    });

    const parsedCsv = csvReadStream.pipe(parser);

    const finalData = [];

    parsedCsv.on('data', async (line) => {
      if (line.estadonotificacao.toLowerCase() === 'paraná') {
        finalData.push({
          id: line.id,
          datanotificacao: line.datanotificacao,
          classificacaofinal: line.classificacaofinal === '' ? 'Em aguardo' : line.classificacaofinal,
        });
      }
    });

    parsedCsv.on('end', () => {
      const { log } = console;

      log(finalData.toString());
    });
  }
}

export default ReadFileService;
