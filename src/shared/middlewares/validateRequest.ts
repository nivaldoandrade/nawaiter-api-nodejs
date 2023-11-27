import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';

import { NextFunction, Request, Response } from 'express';

export function validationMiddleware<T extends object>(
  dtoClass: new () => T,
  property: 'body' | 'query' | 'params',
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const requestBody = {
      body: req.body,
      query: req.query,
      params: req.params,
    };

    const dtoInstance = plainToInstance(dtoClass, requestBody[property]);

    req[property] = dtoInstance;

    const errors: ValidationError[] = await validate(dtoInstance, {
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

      return res.status(400).json(validationErrors);
    }

    next();
  };
}

export function Body<T extends object>(dtoClass: new () => T) {
  return validationMiddleware(dtoClass, 'body');
}
export function Param<T extends object>(dtoClass: new () => T) {
  return validationMiddleware(dtoClass, 'params');
}
export function Query<T extends object>(dtoClass: new () => T) {
  return validationMiddleware(dtoClass, 'query');
}
