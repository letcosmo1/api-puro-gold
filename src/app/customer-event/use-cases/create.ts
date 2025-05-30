import { CustomerEventRepository } from "@app/customer-event/repository";
import { CustomerEvent, CustomerEventCreateResponse, NewCustomerEventData } from "@app/customer-event/types";
import { CreateEntityError, InvalidInputError } from "@app/errors";

export class CustomerEventCreateUseCase {
  constructor(private repository: CustomerEventRepository) {}

  async action(data: NewCustomerEventData): Promise<CustomerEventCreateResponse | CreateEntityError | InvalidInputError> {
    if(!data.customerId?.trim()) return new InvalidInputError("Id do cliente inválido.");
    if(!data.type?.trim()) return new InvalidInputError("Tipo do evento inválido.");
    if(!data.date?.trim()) return new InvalidInputError("Data inválida.");
    if(!data.description?.trim()) return new InvalidInputError("Descrição inválida.");
    if(!data.value) return new InvalidInputError("Valor inválido.");
    if(!data.createdAt) return new InvalidInputError("Data de criação inválida.");

    try {
      const customerEvent = await this.repository.save(data);
      return { success: true, customerEvent }
    } catch (error) {
      return new CreateEntityError("Erro ao criar evento do cliente.");
    }
  }
}