import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';

import IToStoreLine from '../dtos/IToStoreLine';

const { log } = console;

const generateCsv = async (data: IToStoreLine[]): Promise<void> => {
  const csv = createObjectCsvWriter({
    path: path.resolve(__dirname, '..', '..', 'tmp', 'static', 'result.csv'),
    header: [
      {
        id: 'id',
        title: 'id',
      },
      {
        id: 'datanotificacao',
        title: 'Data Notificação',
      },
      {
        id: 'classificacaofinal',
        title: 'Classificação Final',
      },
    ],
    fieldDelimiter: ';',
  });

  csv.writeRecords(data).then(() => {
    log('The CSV file was written successfully');
  }).catch((err) => {
    log(err);
  });
};

export default generateCsv;
