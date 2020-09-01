import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import { format, subDays } from 'date-fns';

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

const data = [];

parsedCsv.on('data', async (line) => data.push(line));

parsedCsv.on('end', () => log(data));
