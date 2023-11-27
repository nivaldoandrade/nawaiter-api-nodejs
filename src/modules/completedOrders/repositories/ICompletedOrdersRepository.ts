import { CompletedOrderCreate } from '../dto/CompletedOrderCreate';
import { CompletedOrderList } from '../dto/CompletedOrderList';
import { CompletedOrderShow } from '../dto/CompletedOrderShow';

export interface ICompletedOrderRepository {
  findAll(
    page: number,
    limit: number,
    dateStart?: string,
    dateEnd?: string,
  ): Promise<{
    completedOrders: CompletedOrderList[];
    totalCount: number;
  }>;
  create(order: CompletedOrderCreate): Promise<void>;
  findById(id: string): Promise<CompletedOrderShow | null>;
}
