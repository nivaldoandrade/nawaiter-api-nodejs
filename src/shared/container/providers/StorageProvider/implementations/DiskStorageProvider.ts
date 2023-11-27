import fs from 'fs';
import { resolve } from 'path';

import uploadConfig from '@shared/config/upload';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';

export class DiskStorageProvider implements IStorageProvider {
  async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      resolve(uploadConfig.tmpDirectory, file),
      resolve(uploadConfig.uploadDirectory, file),
    );

    return file;
  }

  async deleteFile(file: string): Promise<void> {
    const filePath = resolve(uploadConfig.uploadDirectory, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
