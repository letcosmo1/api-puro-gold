import { NewUserData, User } from "@app/user/types";

export interface IAuthRepository {
  registerUser(data: NewUserData): Promise<User>;
}