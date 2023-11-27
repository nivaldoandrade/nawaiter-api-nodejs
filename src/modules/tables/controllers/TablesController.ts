import { plainToInstance } from 'class-transformer';
import { container } from 'tsyringe';

import paginationConfig from '@shared/config/pagination';
import { Request, Response } from 'express';

import { TableResponseDTO } from '../dtos/TableResponseDTO';
import CreateTableService from '../services/CreateTableService';
import DeleteTableService from '../services/DeleteTableService';
import ListTablesService from '../services/ListTablesService';
import ShowTableService from '../services/ShowTableService';
import UpdateTableService from '../services/UpdateTableService';

class TablesController {
  public async list(request: Request, response: Response) {
    const { query } = request;

    const page = Number(query.page) || paginationConfig.page;
    const limit = Number(query.limit) || paginationConfig.limit;

    const listTablesService = container.resolve(ListTablesService);

    const { tables, totalCount } = await listTablesService.execute({
      page,
      limit,
    });

    return response.json({
      tables: plainToInstance(TableResponseDTO, tables),
      totalCount,
    });
  }

  public async create(request: Request, response: Response) {
    const { name, username, password } = request.body;

    const createTableService = container.resolve(CreateTableService);

    const table = await createTableService.execute({
      name,
      username,
      password,
    });

    return response.json(plainToInstance(TableResponseDTO, table));
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const showTableService = container.resolve(ShowTableService);

    const table = await showTableService.execute(id);

    return response.json(plainToInstance(TableResponseDTO, table));
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const table = request.body;

    const updateTableService = container.resolve(UpdateTableService);

    const tableUpdated = await updateTableService.execute(id, table);

    return response.json(tableUpdated);
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    const deleteTableService = container.resolve(DeleteTableService);

    await deleteTableService.execute(id);

    return response.sendStatus(204);
  }
}

export default new TablesController();
