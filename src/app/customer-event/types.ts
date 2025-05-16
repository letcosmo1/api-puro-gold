export type CustomerEvent = {
  id: string,
  customerId: string,
  type: "purchase" | "payment",
  date: string,
  description: string,
  value: number,
  createdAt: Date
}

export type NewCustomerEventData = {
  customerId: string,
  type: "purchase" | "payment",
  date: string,
  description: string,
  value: number,
  createdAt: Date
}

export type UpdateCustomerEventData = {
  description: string,
  value: number
}