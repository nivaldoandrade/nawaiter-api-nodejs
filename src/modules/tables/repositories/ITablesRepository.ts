import { TableRequestDTO } from '../dtos/TableRequestDTO';
import { TableResponseDTO } from '../dtos/TableResponseDTO';
import { TableUpdateDTO } from '../dtos/TableUpdateDTO';

export interface ITablesRepository {
  findAll(
    page: number,
    limit: number,
  ): Promise<{
    tables: TableResponseDTO[];
    totalCount: number;
  }>;
  create(table: TableRequestDTO): Promise<TableResponseDTO>;
  findByUsername(username: string): Promise<TableResponseDTO | null>;
  findById(id: string): Promise<TableResponseDTO | null>;
  update(id: string, table: TableUpdateDTO): Promise<TableResponseDTO | null>;
  delete(id: string): Promise<void>;
}
