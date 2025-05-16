import { NewUserData, User } from "@app/user/types";
import { IAuthRepository } from "./repository-interface";
import { UserModel } from "@model/user";

export class AuthRepository implements IAuthRepository {
  async registerUser(data: NewUserData): Promise<User> {
    const userDocument = await UserModel.create(data);

    const user: User = {
      id: userDocument._id.toString(),
      email: userDocument.email ? userDocument.email : "",
      password: userDocument.password ? userDocument.password : "",
    }

    return user;
  }
}