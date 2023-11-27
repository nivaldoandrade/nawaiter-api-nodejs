import multer from 'multer';

import uploadConfig from '@shared/config/upload';
import { PaginationQueryDTO } from '@shared/dto/PaginationQueryDTO';
import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated';
import { Param, Query } from '@shared/middlewares/validateRequest';
import verifyRole from '@shared/middlewares/verifyRole';
import { Router } from 'express';

import productsController from '../controllers/ProductsController';
import { ProductParamsDTO } from '../dto/ProductParamsDTO';
import { validateCreateAndUpdateRequest } from '../middlewares/validateCreateAndUpdateRequest';

const upload = multer(uploadConfig.multer);

const productsRoutes = Router();

// ROUTER PUBLIC
productsRoutes.get('/', Query(PaginationQueryDTO), productsController.list);
productsRoutes.get('/:id', Param(ProductParamsDTO), productsController.show);

// ROUTER PRIVATE AND ADMIN
productsRoutes.use(ensureAuthenticated, verifyRole(['admin']));
productsRoutes.post(
  '/',
  upload.single('imagePath'),
  validateCreateAndUpdateRequest(),
  productsController.create,
);
productsRoutes.put(
  '/:id',
  Param(ProductParamsDTO),
  upload.single('imagePath'),
  validateCreateAndUpdateRequest(),
  productsController.update,
);
productsRoutes.delete(
  '/:id',
  Param(ProductParamsDTO),
  productsController.delete,
);

export default productsRoutes;
