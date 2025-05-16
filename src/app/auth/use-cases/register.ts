import { ConflictError, CreateEntityError, InvalidInputError } from "@app/errors";
import { AuthRepository } from "../repository";
import { UserRepository } from "@app/user/repository";
import { User } from "@app/user/types";
import { BcryptService } from "@infra/bcrypt-service";

export class AuthRegisterUseCase {
  constructor(
    private authRepository: AuthRepository, 
    private userRepository: UserRepository,
    private bcryptService: BcryptService
  ) {}

  async action(data: User): Promise<User | CreateEntityError | InvalidInputError | ConflictError> {
    if(!data.email?.trim()) return new InvalidInputError("Email inválido.");
    if(!data.password?.trim()) return new InvalidInputError("Senha inválida");

    try {
      const userExists = await this.userRepository.getByEmail(data.email);
      if(userExists) throw new ConflictError("Usuário já existente.")

      const hashedPassword = await this.bcryptService.hash(data.password);

      return this.authRepository.registerUser({ email: data.email, password: hashedPassword });
    } catch (error) {
      return new CreateEntityError("Erro ao criar o usuário.");
    }
  }
}