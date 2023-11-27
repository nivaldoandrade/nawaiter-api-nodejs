import { PaginationQueryDTO } from '@shared/dto/PaginationQueryDTO';
import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated';
import { Body, Param, Query } from '@shared/middlewares/validateRequest';
import verifyRole from '@shared/middlewares/verifyRole';
import { Router } from 'express';

import tablesController from '../controllers/TablesController';
import { TableParamsDTO } from '../dtos/TableParamsDTO';
import { TableRequestDTO } from '../dtos/TableRequestDTO';

const tableRoutes = Router();

tableRoutes.use(ensureAuthenticated);

// ADMIN GARCOM
tableRoutes.use(verifyRole(['admin', 'garcom']));
tableRoutes.get('/', Query(PaginationQueryDTO), tablesController.list);
tableRoutes.get('/:id', Param(TableParamsDTO), tablesController.show);

// ONLY ADMIN
tableRoutes.use(verifyRole(['admin']));
tableRoutes.post('/', Body(TableRequestDTO), tablesController.create);
tableRoutes.put('/:id', Param(TableParamsDTO), tablesController.update);
tableRoutes.delete('/:id', Param(TableParamsDTO), tablesController.delete);

export default tableRoutes;
