import fs from 'fs';
import { resolve } from 'path';

import uploadConfig from '@shared/config/upload';

export async function removeFileTemp(filename: string) {
  const filePath = resolve(uploadConfig.tmpDirectory, filename);

  try {
    await fs.promises.stat(filePath);
  } catch {
    return;
  }

  await fs.promises.unlink(filePath);
}
