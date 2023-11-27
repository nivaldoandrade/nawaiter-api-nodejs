export interface IEncryptionProvider {
  generateHash(password: string): Promise<string>;
  compareHash(password: string, hashCompare: string): Promise<boolean>;
}
