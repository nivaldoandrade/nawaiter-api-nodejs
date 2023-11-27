import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated';
import { Router } from 'express';

import usersController from '../controllers/UsersController';

const meRoutes = Router();

meRoutes.use('/', ensureAuthenticated, usersController.me);

export default meRoutes;
