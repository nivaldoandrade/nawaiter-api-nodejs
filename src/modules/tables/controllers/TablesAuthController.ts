import { container } from 'tsyringe';

import { Request, Response } from 'express';

import SignInTableService from '../services/SignInTableService';

class TablesAuthController {
  public async signin(request: Request, response: Response) {
    const credentials = request.body;

    const signInTablesService = container.resolve(SignInTableService);

    const accessToken = await signInTablesService.execute(credentials);

    return response.json(accessToken);
  }
}

export default new TablesAuthController();
