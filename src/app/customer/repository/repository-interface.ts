import { Customer, NewCustomerData, UpdateCustomerData } from "../types";

export interface ICustomerRepository {
  save(data: NewCustomerData): Promise<Customer>;
  update(id: string, data: UpdateCustomerData): Promise<Customer>;
  list(): Promise<Customer[]>;
  get(id: string): Promise<Customer | null>;
}