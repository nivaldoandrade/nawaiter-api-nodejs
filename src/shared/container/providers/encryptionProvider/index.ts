import { container } from 'tsyringe';

import BcryptJsProvider from './implementations/BcryptJsProvider';
import { IEncryptionProvider } from './models/IEncryptionProvider';

container.registerSingleton<IEncryptionProvider>(
  'EncryptionProvider',
  BcryptJsProvider,
);
