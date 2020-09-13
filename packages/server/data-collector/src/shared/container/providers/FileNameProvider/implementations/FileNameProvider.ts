import { format, subDays } from 'date-fns';

import IFileNameProvider from '../models/IFIleNameProvider';

class FileNameProvider implements IFileNameProvider {
  public generate(prefix: string): string {
    const yesterday = subDays(Date.now(), 1);

    const dateFormatted = format(yesterday, 'yyyyMMdd');

    return `${prefix}-${dateFormatted}`;
  }
}

export default FileNameProvider;
