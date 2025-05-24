export type Customer = {
  id: string,
  name: string
}

export type NewCustomerData = {
  name: string
}

export type UpdateCustomerData = {
  name: string
}

export type CustomerResponse = {
  success: boolean,
  customer: Customer
}

export type CustomerCreateResponse = {
  success: boolean,
  customer: Customer
}

export type CustomerUpdateResponse = {
  success: boolean,
  customer: Customer
}

export type CustomerListResponse = {
  success: boolean,
  customers: Customer[]
}