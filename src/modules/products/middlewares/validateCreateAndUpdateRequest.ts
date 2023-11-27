import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';

import ValidationErrors from '@shared/errors/ValidationErrors';
import { removeFileTemp } from '@shared/utils/removeFileTemp';
import { NextFunction, Request, Response } from 'express';

import { ProductRequestDTO } from '../dto/ProductRequestDTO';

export function validateCreateAndUpdateRequest() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const product = req.body;
    const imagePath = req.file?.filename;

    const formdata = plainToInstance(ProductRequestDTO, {
      ...product,
      price: Number(product.price),
      imagePath: imagePath ?? product.imagePath,
      ingredients: product.ingredients ? JSON.parse(product.ingredients) : null,
    });

    const errors: ValidationError[] = await validate(formdata, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const validationErrors = errors.map((error) => ({
        [error.property]:
          error.children && error.children.length > 0
            ? error.children.flatMap(
                (children) =>
                  children.children?.map((subChild) => ({
                    [subChild.property]: Object.values(
                      subChild.constraints || {},
                    ),
                  })),
              )
            : Object.values(error.constraints || {}),
      }));

      imagePath && (await removeFileTemp(imagePath));
      throw new ValidationErrors(validationErrors);
    }

    req.body = formdata;
    next();
  };
}
