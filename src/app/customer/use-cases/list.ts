import { ListEntityError } from "@app/errors";
import { CustomerRepository } from "../repository";
import { Customer } from "../types";

export class CustomerListUseCase {
  constructor(private repository: CustomerRepository) {}

  async action(): Promise<Customer[] | ListEntityError> {
    try {
      return this.repository.list();
    } catch (error) {
      return new ListEntityError("Erro ao listar os clientes.");
    }
  }
}