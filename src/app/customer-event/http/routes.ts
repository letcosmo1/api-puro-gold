import { Request, Response, Router } from "express";
import { CustomerEventRepository } from "../repository";
import ClientHttpController from "./controller";
import { CustomerEventCreateUseCase, CustomerEventListUseCase, CustomerEventUpdateUseCase } from "../use-cases";
import { authMiddleware } from "@infra/middlewares/auth";

export function createCustomerEventsRoutes(router: Router) {
  const customerEventRepository = new CustomerEventRepository();

  const controller = new ClientHttpController({
    create: new CustomerEventCreateUseCase(customerEventRepository),
    update: new CustomerEventUpdateUseCase(customerEventRepository),
    list: new CustomerEventListUseCase(customerEventRepository),
  });

  router.post("/customer-events", authMiddleware, async (req: Request, res: Response) => {
    const httpResponse = await controller.create(req);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  });

  router.patch("/customer-events/:id", authMiddleware, async (req: Request, res: Response) => {
    const httpResponse = await controller.update(req);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  });

  router.get("/customer-events/:customerId", authMiddleware, async (req: Request, res: Response) => {
    const httpResponse = await controller.list(req);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  });
}