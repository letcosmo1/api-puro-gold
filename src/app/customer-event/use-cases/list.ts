import { ListEntityError, NotFoundError } from "@app/errors";
import { CustomerEventRepository } from "../repository";
import { CustomerEventListResponse } from "../types";
import { CustomerRepository } from "@app/customer/repository";

export class CustomerEventListUseCase {
  constructor(private repository: CustomerEventRepository, private customerRepository: CustomerRepository) {}

  async action(customerId: string): Promise<CustomerEventListResponse | ListEntityError> {
    try {
      const customer = await this.customerRepository.get(customerId);
      if(!customer) return new NotFoundError("Cliente não encontrado.");

      const customerEvents = await this.repository.list(customerId);
      
      return { success: true, customerEvents }
    } catch (error) {
      return new ListEntityError("Erro ao listar os eventos do cliente.");
    }
  }
}