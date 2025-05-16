import { User } from "../types";
import { IUserRepository } from "./repository-interface";
import { UserModel } from "@model/user";

export class UserRepository implements IUserRepository {
  async getById(id: string): Promise<User | null> {
    const userDocument = await UserModel.findById(id);

    if(!userDocument) return null;

    const user: User = {
      id: userDocument._id.toString(),
      email: userDocument.email ? userDocument.email : "",
      password: userDocument.password ? userDocument.password : "",
    }

    return user;
  }

  async getByEmail(email: string): Promise<User | null> {
    const userDocument = await UserModel.findOne({ email: email });

    if(!userDocument) return null;

    const user: User = {
      id: userDocument._id.toString(),
      email: userDocument.email ? userDocument.email : "",
      password: userDocument.password ? userDocument.password : "",
    }

    return user;
  }
}