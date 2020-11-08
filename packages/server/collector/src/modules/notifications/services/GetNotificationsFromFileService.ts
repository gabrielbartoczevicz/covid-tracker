import fs from 'fs';
import path from 'path';

import IFileDataDTO from '@modules/notifications/dtos/IFileDataDTO';

import csv from 'csv-parser';
import { format, subDays } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

class GetNotificationsFromFileService {
  public async execute(): Promise<IFileDataDTO[]> {
    const yesterday = subDays(Date.now(), 1);

    const dateFormatted = format(yesterday, 'ddMMMyyyy', { locale: ptBr });

    const filePath = path.resolve(
      __dirname, '..', '..', '..', '..', 'tmp', 'uploads', `HIST_PAINEL_COVIDBR_${dateFormatted}.csv`,
    );

    const fileReadStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

    const parser = csv({
      separator: ';',
      mapHeaders: ({ header }) => header.toLowerCase(),
    });

    const parsedCsv = fileReadStream.pipe(parser);

    const data: IFileDataDTO[] = [];

    parsedCsv.on('data', (line) => {
      if (String(line.estado).toLowerCase() === 'pr' && line.municipio !== '') {
        data.push(line);
      }
    });

    await new Promise((resolve) => parsedCsv.on('end', resolve));

    return data;
  }
}

export default GetNotificationsFromFileService;
