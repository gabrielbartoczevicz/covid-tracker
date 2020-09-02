import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import {
  format, subDays,
} from 'date-fns';

import IToStoreLine from './dtos/IToStoreLine';
import generateCsv from './providers/generateCsv';

const { log } = console;

const yesterday = subDays(Date.now(), 1);

const dateFormatted = format(yesterday, 'yyyyMMdd');

const csvPath = path.resolve(__dirname, '..', 'tmp', 'uploads', `dados-pr-${dateFormatted}.csv`);

const csvReadStream = fs.createReadStream(csvPath, { encoding: 'latin1' });

const parser = csv({
  separator: ';',
  mapHeaders: ({ header }) => header.toLowerCase().replace('ÿ', ''),
});

const parsedCsv = csvReadStream.pipe(parser);

const finalData: IToStoreLine[] = [];

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
  log('Dados lidos');

  generateCsv(finalData);
});
