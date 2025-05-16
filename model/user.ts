import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String }
});

export const UserModel = model("user", userSchema);