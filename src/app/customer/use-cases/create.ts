import { CreateEntityError, InvalidInputError } from "@app/errors";
import { CustomerRepository } from "../repository";
import { CustomerCreateResponse, NewCustomerData } from "../types";

export class CustomerCreateUseCase {
  constructor(private repository: CustomerRepository) {}

  async action(data: NewCustomerData): Promise<CustomerCreateResponse | CreateEntityError | InvalidInputError> {
    if(!data.name?.trim()) return new InvalidInputError("Nome inválido.");

    try {
      const customer = await this.repository.save(data);
      return { success: true, customer };
    } catch (error) {
      return new CreateEntityError("Erro ao criar o cliente.");
    }
  }
}