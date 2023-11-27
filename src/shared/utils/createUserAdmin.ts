import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IEncryptionProvider } from '@shared/container/providers/encryptionProvider/models/IEncryptionProvider';

@injectable()
class CreateUserAdmin {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('EncryptionProvider')
    private encryptionProvider: IEncryptionProvider,
  ) {}

  public async execute() {
    const isUserAdmin = await this.usersRepository.findByRole('admin');

    if (isUserAdmin) {
      return;
    }

    const hashPassword = await this.encryptionProvider.generateHash('12345678');

    await this.usersRepository.create({
      name: 'admin',
      username: 'admin',
      role: 'admin',
      password: hashPassword,
    });

    console.log('User admin created successfully!');
  }
}

export default CreateUserAdmin;
