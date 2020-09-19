import { container } from 'tsyringe';

import '@shared/container/providers/FileNameProvider';

import ReadFileService from '@modules/PopulateData/services/ReadFileService';

container.registerSingleton(
  'ReadFileService',
  ReadFileService,
);
