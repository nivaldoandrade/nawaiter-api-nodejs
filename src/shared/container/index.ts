import { container } from 'tsyringe';

import '@modules/users/providers/';
import '@shared/container/providers/';

import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { ICompletedOrderRepository } from '@modules/completedOrders/repositories/ICompletedOrdersRepository';
import { IOrderItemsRepository } from '@modules/orderItems/repositories/IOrderItemsRepository';
import { IOrdersRespository } from '@modules/orders/Repositories/IOrdersRepository';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { ITablesRepository } from '@modules/tables/repositories/ITablesRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import CategoryRepository from '@shared/database/prisma/CategoryRepository';
import CompletedOrderRepository from '@shared/database/prisma/CompletedOrderRepository';
import OrderItemsRepository from '@shared/database/prisma/OrderItemsRepository';
import OrderRepository from '@shared/database/prisma/OrderRepository';
import ProductsRepository from '@shared/database/prisma/ProductsRepository';
import TableRepository from '@shared/database/prisma/TableRepository';
import UserRepository from '@shared/database/prisma/UserRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UserRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoryRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IOrdersRespository>(
  'OrdersRepository',
  OrderRepository,
);

container.registerSingleton<ITablesRepository>(
  'TablesRepository',
  TableRepository,
);

container.registerSingleton<IOrderItemsRepository>(
  'OrderItemsRepository',
  OrderItemsRepository,
);

container.registerSingleton<ICompletedOrderRepository>(
  'CompletedOrdersRepository',
  CompletedOrderRepository,
);
