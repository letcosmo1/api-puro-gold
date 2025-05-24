import { InvalidInputError, NotFoundError, UpdateEntityError } from "@app/errors";
import { CustomerRepository } from "../repository";
import { CustomerUpdateResponse, UpdateCustomerData } from "../types";

export class CustomerUpdateUseCase {
  constructor(private repository: CustomerRepository) {}

  async action(id: string, data: UpdateCustomerData): Promise<CustomerUpdateResponse | UpdateEntityError | InvalidInputError | NotFoundError> {
    if(!data.name?.trim()) return new InvalidInputError("Nome inválido.");

    try {
      const customerExists = await this.repository.get(id);

      if(!customerExists) return new NotFoundError("Cliente não encontrado.");

      const updatedCustomer = await this.repository.update(id, data);

      return { success:true, customer: updatedCustomer };
    } catch (error) {
      return new UpdateEntityError("Erro ao atualizar cliente.");
    }
  }
}