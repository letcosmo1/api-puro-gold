import { GetEntityError, NotFoundError } from "@app/errors";
import { CustomerRepository } from "../repository";
import { CustomerResponse } from "../types";

export class CustomerGetUseCase {
  constructor(private repository: CustomerRepository) {}

  async action(id: string): Promise<CustomerResponse | GetEntityError | NotFoundError> {
    try {
      const customer = await this.repository.get(id);

      if(!customer) return new NotFoundError("Cliente não encontrado.");

      return { success: true, customer };
    } catch (error) {
      return new GetEntityError("Erro ao buscar cliente.");
    }
  }
}