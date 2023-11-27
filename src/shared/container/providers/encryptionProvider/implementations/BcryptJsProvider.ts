import { compare, hash } from 'bcryptjs';

import { IEncryptionProvider } from '../models/IEncryptionProvider';

export class BcryptJsProvider implements IEncryptionProvider {
  public async generateHash(password: string): Promise<string> {
    return hash(password, 12);
  }

  public async compareHash(
    password: string,
    hashCompare: string,
  ): Promise<boolean> {
    return compare(password, hashCompare);
  }
}

export default BcryptJsProvider;
