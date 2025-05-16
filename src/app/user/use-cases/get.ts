import { GetEntityError, NotFoundError } from "@app/errors";
import { UserRepository } from "../repository";
import { User } from "../types";

export class UserGetUseCase {
  constructor(private repository: UserRepository) {}

  async action(id: string): Promise<User | GetEntityError | NotFoundError> {
    try {
      const user = await this.repository.getById(id);

      if(!user) return new NotFoundError("Usuário não encontrado.");

      return user;
    } catch (error) {
      return new GetEntityError("Erro ao buscar usuário.");
    }
  }
}