import { Request, Response, Router } from "express";
import ClientHttpController from "./controller";
import { AuthRegisterUseCase, AuthLoginUseCase } from "../use-cases";
import { JwtService } from "@infra/jwt-service";
import { AuthRepository } from "../repository";
import { UserRepository } from "@app/user/repository";
import { BcryptService } from "@infra/bcrypt-service";

export function createAuthRoutes(router: Router) {
  const authRepository = new AuthRepository();
  const userRepository = new UserRepository();
  const jwtService = new JwtService();
  const bcryptService = new BcryptService();

  const controller = new ClientHttpController({
    login: new AuthLoginUseCase(userRepository, jwtService, bcryptService),
    register: new AuthRegisterUseCase(authRepository, userRepository, bcryptService)
  });

  router.post("/auth/register", async (req: Request, res: Response) => {
    const httpResponse = await controller.register(req);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  });

  router.post("/auth/login", async (req: Request, res: Response) => {
    const httpResponse = await controller.login(req);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  });
}