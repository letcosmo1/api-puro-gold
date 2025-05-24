import { ListEntityError } from "@app/errors";
import { CustomerRepository } from "../repository";
import { Customer, CustomerListResponse } from "../types";

export class CustomerListUseCase {
  constructor(private repository: CustomerRepository) {}

  async action(): Promise<CustomerListResponse | ListEntityError> {
    try {
      const customers = await this.repository.list();

      return { success: true, customers };
    } catch (error) {
      return new ListEntityError("Erro ao listar os clientes.");
    }
  }
}