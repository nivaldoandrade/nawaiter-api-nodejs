import { container } from 'tsyringe';

import BcryptJsProvider from '@shared/container/providers/encryptionProvider/implementations/BcryptJsProvider';
import { IEncryptionProvider } from '@shared/container/providers/encryptionProvider/models/IEncryptionProvider';

container.registerSingleton<IEncryptionProvider>(
  'EncryptionProvider',
  BcryptJsProvider,
);
