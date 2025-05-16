import { Request, Response, Router } from "express";
import { UserRepository } from "../repository";
import ClientHttpController from "./controller";
import { UserGetUseCase } from "../use-cases";

export function createUserRoutes(router: Router) {
  const userRepository = new UserRepository();

  const controller = new ClientHttpController({
    get: new UserGetUseCase(userRepository)
  });

  router.get("/users/:id", async (req: Request, res: Response) => {
    const httpResponse = await controller.get(req);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  });
}