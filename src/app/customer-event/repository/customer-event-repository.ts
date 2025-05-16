import { NewCustomerEventData, CustomerEvent, UpdateCustomerEventData } from "../types";
import { ICustomerEventRepository } from "./repository-interface";
import { CustomerEventModel } from "@model/customer-event";

export class CustomerEventRepository implements ICustomerEventRepository {
  async save(data: NewCustomerEventData): Promise<CustomerEvent> {
    const customerEventDocument = await CustomerEventModel.create(data);

    const customerEvent: CustomerEvent = {
      id: customerEventDocument._id.toString(),
      customerId: customerEventDocument.customerId ? customerEventDocument.customerId : "",
      type: customerEventDocument.type === "purchase" ? "purchase" : "payment",
      date: customerEventDocument.date ? customerEventDocument.date : "",
      description: customerEventDocument.description ? customerEventDocument.description : "",
      value: customerEventDocument.value ? customerEventDocument.value : 0,
      createdAt: customerEventDocument.createdAt ? customerEventDocument.createdAt : new Date(0),
    }

    return customerEvent;
  }

  async update(id: string, data: UpdateCustomerEventData): Promise<CustomerEvent> {
    const customerEventDocument = await CustomerEventModel.findByIdAndUpdate( id, data, { new: true });

    if(!customerEventDocument) throw new Error("Erro ao atualizar evento do cliente.");

    const updatedCustomerEvent: CustomerEvent = {
      id: customerEventDocument._id.toString(),
      customerId: customerEventDocument.customerId ? customerEventDocument.customerId : "",
      type: customerEventDocument.type === "purchase" ? "purchase" : "payment",
      date: customerEventDocument.date ? customerEventDocument.date : "",
      description: customerEventDocument.description ? customerEventDocument.description : "",
      value: customerEventDocument.value ? customerEventDocument.value : 0,
      createdAt: customerEventDocument.createdAt ? customerEventDocument.createdAt : new Date(0),
    }

    return updatedCustomerEvent;
  }

  async list(customerId: string): Promise<CustomerEvent[]> {
    const customerEventDocuments = await CustomerEventModel.find({ customerId: customerId }).sort({ createdAt: -1 });

    const customerEvents: CustomerEvent[] = customerEventDocuments.map(customerEvent => {
      return {
        id: customerEvent._id.toString(),
        customerId: customerEvent.customerId ? customerEvent.customerId : "",
        type: customerEvent.type === "purchase" ? "purchase" : "payment",
        date: customerEvent.date ? customerEvent.date : "",
        description: customerEvent.description ? customerEvent.description : "",
        value: customerEvent.value ? customerEvent.value : 0,
        createdAt: customerEvent.createdAt ? customerEvent.createdAt : new Date(0),
      }
    })

    return customerEvents;
  }

  async get(id: string): Promise<CustomerEvent | null> {
    const customerEventDocument = await CustomerEventModel.findById(id);

    if(!customerEventDocument) return null;

    const customer: CustomerEvent = {
      id: customerEventDocument._id.toString(),
      customerId: customerEventDocument.customerId ? customerEventDocument.customerId : "",
      type: customerEventDocument.type === "purchase" ? "purchase" : "payment",
      date: customerEventDocument.date ? customerEventDocument.date : "",
      description: customerEventDocument.description ? customerEventDocument.description : "",
      value: customerEventDocument.value ? customerEventDocument.value : 0,
      createdAt: customerEventDocument.createdAt ? customerEventDocument.createdAt : new Date(0),
    }

    return customer;
  }
}