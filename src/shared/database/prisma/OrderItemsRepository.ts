import { PrismaClient } from '@prisma/client';

import { OrderItemListToStatus } from '@modules/orderItems/dto/OrderItemListToStatus';
import { OrderItemResult } from '@modules/orderItems/dto/OrderItemResult';
import { EnumOrderItemStatus } from '@modules/orderItems/entity/OrderItem';
import { IOrderItemsRepository } from '@modules/orderItems/repositories/IOrderItemsRepository';

class OrderItemsRepository implements IOrderItemsRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<OrderItemListToStatus[]> {
    const orderitems = await this.prisma.orderItem.findMany({
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
            // price: true,
          },
        },
        order: {
          select: {
            table: {
              select: {
                name: true,
              },
            },
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    return orderitems.map((item) => ({
      id: item.id,
      status: item.status,
      quantity: item.quantity,
      table: item.order.table.name,
      product: {
        id: item.product.id,
        name: item.product.name,
      },
      observation: item.observation,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
  }

  async findById(id: string): Promise<OrderItemResult | null> {
    const orderItem = await this.prisma.orderItem.findUnique({
      where: { id },
      select: {
        id: true,
        status: true,
        quantity: true,
        totalPrice: true,
        observation: true,
        createdAt: true,
        updatedAt: true,
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            imagePath: true,
          },
        },
        order: {
          select: {
            table: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!orderItem) {
      return null;
    }

    const { order, ...orderItemWithoutOrder } = orderItem;

    return {
      ...orderItemWithoutOrder,
      table: {
        id: order.table.id,
        name: order.table.name,
      },
    };
  }

  async update(id: string, status: EnumOrderItemStatus): Promise<void> {
    await this.prisma.orderItem.update({
      where: { id },
      data: {
        status,
      },
    });
  }

  async findByProductId(productId: string): Promise<boolean> {
    const orderItem = await this.prisma.orderItem.findFirst({
      where: {
        productId,
      },
    });

    return !!orderItem;
  }
}

export default OrderItemsRepository;
