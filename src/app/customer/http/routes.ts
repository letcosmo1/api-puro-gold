import { Request, Response, Router } from "express";
import { CustomerRepository } from "../repository";
import ClientHttpController from "./controller";
import { CustomerCreateUseCase, CustomerGetUseCase, CustomerListUseCase, CustomerUpdateUseCase } from "../use-cases";
import { authMiddleware } from "@infra/middlewares/auth";

export function createCustomerRoutes(router: Router) {
  const customerRepository = new CustomerRepository();

  const controller = new ClientHttpController({
    create: new CustomerCreateUseCase(customerRepository),
    update: new CustomerUpdateUseCase(customerRepository),
    list: new CustomerListUseCase(customerRepository),
    get: new CustomerGetUseCase(customerRepository),
  });

  router.post("/customers", authMiddleware, async (req: Request, res: Response) => {
    const httpResponse = await controller.create(req);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  });

  router.patch("/customers/:id",  authMiddleware, async (req: Request, res: Response) => {
    const httpResponse = await controller.update(req);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  });

  router.get("/customers/:id", authMiddleware, async (req: Request, res: Response) => {
    const httpResponse = await controller.get(req);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  });

  router.get("/customers",  authMiddleware, async (_: Request, res: Response) => {
    const httpResponse = await controller.list();
    res.status(httpResponse.statusCode).json(httpResponse.body);
  });
}