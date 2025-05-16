import { CustomerEvent, NewCustomerEventData, UpdateCustomerEventData } from "../types";

export interface ICustomerEventRepository {
  save(data: NewCustomerEventData): Promise<CustomerEvent>;
  update(id: string, data: UpdateCustomerEventData): Promise<CustomerEvent>;
  list(customerId: string): Promise<CustomerEvent[]>;
  get(id: string): Promise<CustomerEvent | null>;
}