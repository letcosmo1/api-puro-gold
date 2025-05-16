import { Schema, model } from "mongoose";

const customerSchema = new Schema({
  name: String,
});

export const CustomerModel = model("customer", customerSchema);