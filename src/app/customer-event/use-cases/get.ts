import { GetEntityError, NotFoundError } from "@app/errors";
import { CustomerEventRepository } from "../repository";
import { CustomerEvent } from "../types";

export class CustomerEventGetUseCase {
  constructor(private repository: CustomerEventRepository) {}

  async action(id: string): Promise<CustomerEvent | GetEntityError | NotFoundError> {
    try {
      const customerEvent = await this.repository.get(id);

      if(!customerEvent) return new NotFoundError("Evento do cliente não encontrado.");

      return customerEvent;
    } catch (error) {
      return new GetEntityError("Erro ao buscar evento do cliente.");
    }
  }
}