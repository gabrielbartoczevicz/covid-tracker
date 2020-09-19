import { format, subDays } from 'date-fns';

import IFileNameProvider from '@shared/container/providers/FileNameProvider/models/IFIleNameProvider';
import IFileNameProviderDTO from '@shared/container/providers/FileNameProvider/dtos/IFileNameProviderDTO';

class FileNameProvider implements IFileNameProvider {
  public generate({ name, ext }: IFileNameProviderDTO): string {
    const yesterday = subDays(Date.now(), 1);

    const dateFormatted = format(yesterday, 'yyyyMMdd');

    const fileName = ext ? `${name}-${dateFormatted}.${ext}` : `${name}-${dateFormatted}.csv`;

    return fileName;
  }
}

export default FileNameProvider;
