import { InvalidInputError, NotFoundError, UnauthorizedError } from "@app/errors";
import { LoginResponse } from "../types";
import { JwtService } from "@infra/jwt-service";
import { LoginError } from "@app/errors/login-error";
import { UserRepository } from "@app/user/repository";
import { User } from "@app/user/types";
import { BcryptService } from "@infra/bcrypt-service";

export class AuthLoginUseCase {
  constructor(
    private userRepository: UserRepository, 
    private jwtService: JwtService,
    private bcryptService: BcryptService
  ) {}

  async action(data: User): Promise<LoginResponse | InvalidInputError | NotFoundError | UnauthorizedError | LoginError> {
    if(!data.email?.trim()) return new InvalidInputError("Email inválido.");
    if(!data.password?.trim()) return new InvalidInputError("Senha inválida");

    try {
      const user = await this.userRepository.getByEmail(data.email);
      if(!user) return new NotFoundError("Usuário não encontrado.");

      const match = await this.bcryptService.compare(data.password, user.password);
      if (!match) return new UnauthorizedError("Crendenciais inválidas.")

      const token = this.jwtService.generateToken(user);
      
      return { token, user: { id: user.id, email: user.email } };
    } catch (error) {
      return new LoginError("Erro no login.");
    }
  }
}