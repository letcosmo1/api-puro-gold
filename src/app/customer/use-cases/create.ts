import { CreateEntityError, InvalidInputError } from "@app/errors";
import { CustomerRepository } from "../repository";
import { Customer, NewCustomerData } from "../types";

export class CustomerCreateUseCase {
  constructor(private repository: CustomerRepository) {}

  async action(data: NewCustomerData): Promise<Customer | CreateEntityError | InvalidInputError> {
    if(!data.name?.trim()) return new InvalidInputError("Nome inválido.");

    try {
      return this.repository.save(data);
    } catch (error) {
      return new CreateEntityError("Erro ao criar o cliente.");
    }
  }
}