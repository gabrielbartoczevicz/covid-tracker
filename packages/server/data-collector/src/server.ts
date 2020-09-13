import 'reflect-metadata';

import '@shared/container';

import { container } from 'tsyringe';

import ReadFileService from '@modules/CSVStram/ReadFileService';

const readFile = container.resolve(ReadFileService);

readFile.execute();
