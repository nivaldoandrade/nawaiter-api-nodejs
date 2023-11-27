import crypto from 'crypto';
import { resolve } from 'path';

import multer from 'multer';

const uploadFolder = resolve(__dirname, '..', '..', '..', 'uploads');
const tmpFolder = resolve(uploadFolder, 'tmp');

export default {
  tmpDirectory: tmpFolder,
  uploadDirectory: uploadFolder,

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const filenameHash = crypto.randomBytes(6).toString('hex');
        const filename = `${filenameHash}-${file.originalname}`;

        return callback(null, filename);
      },
    }),
  },
};
