import { PrismaClient } from '@prisma/client';

import { OrderCreate, OrderCreateItem } from '@modules/orders/dto/OrderCreate';
import { OrderList } from '@modules/orders/dto/OrderList';
import { OrderShow } from '@modules/orders/dto/OrderShow';
import { IOrdersRespository } from '@modules/orders/Repositories/IOrdersRepository';

class OrderRepository implements IOrdersRespository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{
    orders: OrderList[];
    totalCount: number;
  }> {
    const skip = (page - 1) * limit;

    const [orders, count] = await this.prisma.$transaction([
      this.prisma.order.findMany({
        include: {
          table: {
            select: {
              name: true,
            },
          },
          _count: true,
        },
        skip,
        take: limit,
      }),
      this.prisma.order.count(),
    ]);

    const formattedOrder = orders.map((order) => {
      const { _count, ...orderWithoutCount } = order;

      return {
        ...orderWithoutCount,
        itemsCount: _count.items,
      };
    });

    return {
      orders: formattedOrder,
      totalCount: count,
    };
  }

  async getOrderIdByTableId(tableId: string): Promise<string | null> {
    const order = await this.prisma.order.findUnique({
      where: {
        tableId,
      },
      select: {
        id: true,
      },
    });

    return order?.id ?? null;
  }

  async findByIdIncludingProductAndTable(
    orderId: string,
  ): Promise<OrderShow | null> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        table: {
          select: {
            name: true,
          },
        },
        items: {
          select: {
            id: true,
            status: true,
            quantity: true,
            totalPrice: true,
            observation: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                imagePath: true,
              },
            },
          },
        },
      },
    });

    return order;
  }

  async findByTableId(tableId: string): Promise<boolean> {
    const order = await this.prisma.order.findUnique({
      where: {
        tableId,
      },
    });

    return !!order;
  }

  async update(id: string, items: OrderCreateItem[]): Promise<void> {
    await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        updatedAt: new Date(),
        items: {
          createMany: {
            data: items,
          },
        },
      },
    });
  }

  async create({ tableId, items }: OrderCreate): Promise<string> {
    const order = await this.prisma.order.create({
      data: {
        tableId,
        items: {
          createMany: {
            data: items,
          },
        },
      },
    });

    return order.id;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.order.delete({
      where: { id },
    });
  }
}

export default OrderRepository;
