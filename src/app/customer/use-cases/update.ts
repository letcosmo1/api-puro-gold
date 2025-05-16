import { InvalidInputError, NotFoundError, UpdateEntityError } from "@app/errors";
import { CustomerRepository } from "../repository";
import { Customer, UpdateCustomerData } from "../types";

export class CustomerUpdateUseCase {
  constructor(private repository: CustomerRepository) {}

  async action(id: string, data: UpdateCustomerData): Promise<Customer | UpdateEntityError | InvalidInputError | NotFoundError> {
    if(!data.name?.trim()) return new InvalidInputError("Nome inválido.");

    try {
      const customerExists = await this.repository.get(id);

      if(!customerExists) return new NotFoundError("Cliente não encontrado.");

      return this.repository.update(id, data);
    } catch (error) {
      return new UpdateEntityError("Erro ao atualizar cliente.");
    }
  }
}