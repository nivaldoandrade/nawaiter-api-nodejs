import { Prisma, PrismaClient } from '@prisma/client';

import { TableRequestDTO } from '@modules/tables/dtos/TableRequestDTO';
import { TableResponseDTO } from '@modules/tables/dtos/TableResponseDTO';
import { TableUpdateDTO } from '@modules/tables/dtos/TableUpdateDTO';
import { ITablesRepository } from '@modules/tables/repositories/ITablesRepository';

class TableRepository implements ITablesRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{
    tables: TableResponseDTO[];
    totalCount: number;
  }> {
    const skip = (page - 1) * limit;

    const query: Prisma.TableFindManyArgs = {
      skip,
      take: limit,
    };

    const [tables, count] = await this.prisma.$transaction([
      this.prisma.table.findMany(query),
      this.prisma.table.count(),
    ]);

    return { tables, totalCount: count };
  }

  async create({
    name,
    username,
    password,
  }: TableRequestDTO): Promise<TableResponseDTO> {
    const table = await this.prisma.table.create({
      data: { name, username, password },
    });

    return table;
  }

  async findByUsername(username: string): Promise<TableResponseDTO | null> {
    const table = await this.prisma.table.findUnique({
      where: { username },
    });

    return table;
  }

  async findById(id: string): Promise<TableResponseDTO | null> {
    const table = await this.prisma.table.findUnique({
      where: { id },
    });

    return table;
  }

  async update(
    id: string,
    { name, username, password }: TableUpdateDTO,
  ): Promise<TableResponseDTO | null> {
    const table = await this.prisma.table.update({
      where: { id },
      data: {
        name,
        username,
        password,
      },
    });

    return table;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.table.delete({
      where: { id },
    });
  }
}

export default TableRepository;
