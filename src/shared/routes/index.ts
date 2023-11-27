import categoriesRoutes from '@modules/categories/routes/categories.routes';
import completedOrdersRoutes from '@modules/completedOrders/routes/completedorders.routes';
import orderItemsRoutes from '@modules/orderItems/routes/orderitems.routes';
import ordersRoutes from '@modules/orders/routes/orders.routes';
import productsRoutes from '@modules/products/routers/products.routes';
import tablesRoutes from '@modules/tables/routes/tables.routes';
import tablesAuthRoutes from '@modules/tables/routes/tablesAuth.routes';
import authRoutes from '@modules/users/routes/auth.routes';
import meRoutes from '@modules/users/routes/me.routes';
import usersRoutes from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/me', meRoutes);
routes.use('/signin', authRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/products', productsRoutes);
routes.use('/orders', ordersRoutes);
routes.use('/tables/signin', tablesAuthRoutes);
routes.use('/tables', tablesRoutes);
routes.use('/orderitems', orderItemsRoutes);
routes.use('/completedorders', completedOrdersRoutes);

export default routes;
