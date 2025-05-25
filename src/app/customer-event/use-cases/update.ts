import { InvalidInputError, NotFoundError, UpdateEntityError } from "@app/errors";
import { CustomerEventRepository } from "../repository";
import { CustomerEvent, CustomerEventUpdateResponse, UpdateCustomerEventData } from "../types";

export class CustomerEventUpdateUseCase {
  constructor(private repository: CustomerEventRepository) {}

  async action(id: string, data: UpdateCustomerEventData): Promise<CustomerEventUpdateResponse | UpdateEntityError | InvalidInputError | NotFoundError> {
    if(!data.description && !data.value) {
      if(!data.description?.trim()) return new InvalidInputError("Descrição inválida.");
      if(!data.value) return new InvalidInputError("Valor inválido.");
    }

    try {
      const customerEventExists = await this.repository.get(id);

      if(!customerEventExists) return new NotFoundError("Evento do cliente não encontrado.");

      const updatedCustomerEvent = await this.repository.update(id, data);

      return { success: true, customerEvent: updatedCustomerEvent };
    } catch (error) {
      return new UpdateEntityError("Erro ao atualizar evento do cliente.");
    }
  }
}