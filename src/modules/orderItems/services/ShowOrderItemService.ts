import { inject, injectable } from 'tsyringe';

import FindOrderItemByIdService from './FindOrderItemByIdService';

@injectable()
class ShowOrderItemService {
  constructor(
    @inject('FindOrderItemByIdService')
    private findOrderItemByIdService: FindOrderItemByIdService,
  ) {}

  public async execute(id: string) {
    const orderItem = await this.findOrderItemByIdService.findById(id);

    return orderItem;
  }
}

export default ShowOrderItemService;
