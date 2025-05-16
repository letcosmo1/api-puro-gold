import mongoose, { Schema, model } from "mongoose";

const customerEventSchema = new Schema({
  customerId: String,
  type: String,
  date: String,
  description: String,
  value: Number,
  createdAt: Date
});

export const CustomerEventModel = model("customer_events", customerEventSchema);