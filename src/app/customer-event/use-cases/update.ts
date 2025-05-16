import { InvalidInputError, NotFoundError, UpdateEntityError } from "@app/errors";
import { CustomerEventRepository } from "../repository";
import { CustomerEvent, UpdateCustomerEventData } from "../types";

export class CustomerEventUpdateUseCase {
  constructor(private repository: CustomerEventRepository) {}

  async action(id: string, data: UpdateCustomerEventData): Promise<CustomerEvent | UpdateEntityError | InvalidInputError | NotFoundError> {
    if(!data.description && !data.value) {
      if(!data.description?.trim()) return new InvalidInputError("Descrição inválida.");
      if(!data.value) return new InvalidInputError("Valor inválido.");
    }

    try {
      const customerEventExists = await this.repository.get(id);

      if(!customerEventExists) return new NotFoundError("Evento do cliente não encontrado.");

      return this.repository.update(id, data);
    } catch (error) {
      return new UpdateEntityError("Erro ao atualizar evento do cliente.");
    }
  }
}