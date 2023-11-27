import { Body } from '@shared/middlewares/validateRequest';
import { Router } from 'express';

import tablesAuthController from '../controllers/TablesAuthController';
import { TableAuthDTO } from '../dtos/TableAuthDTO';

const tablesAuthRoutes = Router();

tablesAuthRoutes.post('/', Body(TableAuthDTO), tablesAuthController.signin);

export default tablesAuthRoutes;
