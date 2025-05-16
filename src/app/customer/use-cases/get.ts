import { GetEntityError, NotFoundError } from "@app/errors";
import { CustomerRepository } from "../repository";
import { Customer } from "../types";

export class CustomerGetUseCase {
  constructor(private repository: CustomerRepository) {}

  async action(id: string): Promise<Customer | GetEntityError | NotFoundError> {
    try {
      const customer = await this.repository.get(id);

      if(!customer) return new NotFoundError("Cliente não encontrado.");

      return customer;
    } catch (error) {
      return new GetEntityError("Erro ao buscar cliente.");
    }
  }
}