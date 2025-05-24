import mongoose from "mongoose";
import { NewCustomerData, Customer, UpdateCustomerData } from "../types";
import { ICustomerRepository } from "./repository-interface";
import { CustomerModel } from "@model/customer";

export class CustomerRepository implements ICustomerRepository {
  async save(data: NewCustomerData): Promise<Customer> {
    const customerDocument = await CustomerModel.create(data);

    const customer: Customer = {
      id: customerDocument._id.toString(),
      name: customerDocument.name ? customerDocument.name : ""
    }

    return customer;
  }

  async update(id: string, data: UpdateCustomerData): Promise<Customer> {
    const customerDocument = await CustomerModel.findByIdAndUpdate( id, data, { new: true });

    if(!customerDocument) throw new Error("Erro ao atualizar cliente.");

    const updatedCustomer: Customer = {
      id: customerDocument._id.toString(),
      name: customerDocument.name ? customerDocument.name : ""
    }

    return updatedCustomer;
  }

  async list(): Promise<Customer[]> {
    const customerDocuments = await CustomerModel.find();

    const customers = customerDocuments.map(customer => {
      return {
        id: customer._id.toString(),
        name: customer.name ? customer.name : ""
      }
    })

    return customers;
  }

  async get(id: string): Promise<Customer | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;

    const customerDocument = await CustomerModel.findById(id);

    if(!customerDocument) return null;

    const customer: Customer = {
      id: customerDocument._id.toString(),
      name: customerDocument.name ? customerDocument.name : ""
    }

    return customer;
  }
}