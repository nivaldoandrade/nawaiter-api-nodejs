import { container } from 'tsyringe';

import { Request, Response } from 'express';

import { AuthRequestDTO } from '../dtos/AuthRequestDTO';
import SignInUserService from '../services/SignInUserService';

class AuthController {
  public async signin(request: Request, response: Response) {
    const credentials: AuthRequestDTO = request.body;

    const signinUserService = container.resolve(SignInUserService);

    const user = await signinUserService.execute(credentials);

    return response.json(user);
  }
}

export default new AuthController();
