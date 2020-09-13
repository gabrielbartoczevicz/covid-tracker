import { container } from 'tsyringe';

import FileNameProvider from '@shared/container/providers/FileNameProvider/implementations/FileNameProvider';
import IFileNameProvider from '@shared/container/providers/FileNameProvider/models/IFIleNameProvider';

container.registerSingleton<IFileNameProvider>(
  'FileNameProvider',
  FileNameProvider,
);
