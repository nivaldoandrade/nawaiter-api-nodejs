import { Prisma, PrismaClient } from '@prisma/client';
import { plainToInstance } from 'class-transformer';

import {
  CompleteOrderItem,
  CompletedOrderCreate,
} from '@modules/completedOrders/dto/CompletedOrderCreate';
import { CompletedOrderList } from '@modules/completedOrders/dto/CompletedOrderList';
import { CompletedOrderShow } from '@modules/completedOrders/dto/CompletedOrderShow';
import { ICompletedOrderRepository } from '@modules/completedOrders/repositories/ICompletedOrdersRepository';
import { setDateBoundary } from '@shared/utils/setDateBoundary';

class CompletedOrderRepository implements ICompletedOrderRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(
    page: number,
    limit: number,
    dateStart: string,
    dateEnd: string,
  ): Promise<{
    completedOrders: CompletedOrderList[];
    totalCount: number;
  }> {
    const skip = (page - 1) * limit;
    const gte = dateStart && setDateBoundary(dateStart, 'start');
    const lte = dateEnd
      ? setDateBoundary(dateEnd, 'end')
      : setDateBoundary(dateStart, 'end');

    const query: Prisma.CompletedOrderFindManyArgs = {
      select: {
        id: true,
        orderNumber: true,
        date: true,
        table: true,
        totalPrice: true,
      },
      where: {
        date: {
          gte,
          lte,
        },
      },
      skip,
      take: limit,
    };

    const [completedOrders, count] = await this.prisma.$transaction([
      this.prisma.completedOrder.findMany(query),
      this.prisma.completedOrder.count({
        where: {
          date: {
            gte,
            lte,
          },
        },
      }),
    ]);

    return {
      completedOrders,
      totalCount: count,
    };
  }

  async create({
    orderNumber,
    table,
    items,
    totalPrice,
  }: CompletedOrderCreate): Promise<void> {
    await this.prisma.completedOrder.create({
      data: {
        orderNumber,
        table,
        items: items as unknown as Prisma.JsonArray,
        totalPrice,
      },
    });
  }

  async findById(id: string): Promise<CompletedOrderShow | null> {
    const completedOrder = await this.prisma.completedOrder.findUnique({
      where: { id },
    });

    if (!completedOrder) {
      return null;
    }
    const itemsArray = completedOrder?.items as Prisma.JsonArray;

    const items = itemsArray.map((item) =>
      plainToInstance(CompleteOrderItem, item, {
        excludeExtraneousValues: true,
      }),
    );

    return {
      ...completedOrder,
      items,
    };
  }
}

export default CompletedOrderRepository;
