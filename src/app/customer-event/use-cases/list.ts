import { ListEntityError } from "@app/errors";
import { CustomerEventRepository } from "../repository";
import { CustomerEvent } from "../types";

export class CustomerEventListUseCase {
  constructor(private repository: CustomerEventRepository) {}

  async action(customerId: string): Promise<CustomerEvent[] | ListEntityError> {
    try {
      return this.repository.list(customerId);
    } catch (error) {
      return new ListEntityError("Erro ao listar os eventos do cliente.");
    }
  }
}