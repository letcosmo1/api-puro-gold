import {
  badRequest,
  created,
  HttpRequest,
  HttpResponse,
  notFound,
  ok,
  serverError,
} from "@shared/http";
import { CustomerCreateUseCase, CustomerUpdateUseCase, CustomerListUseCase, CustomerGetUseCase  } from "../use-cases"
import { CreateEntityError, GetEntityError, InvalidInputError, ListEntityError, NotFoundError, UpdateEntityError } from "@app/errors";

export type UseCases = {
  create: CustomerCreateUseCase,
  update: CustomerUpdateUseCase,
  list: CustomerListUseCase,
  get: CustomerGetUseCase,
};

export default class CustomerHttpController {
  constructor(private useCases: UseCases) {}

  async create(request: HttpRequest): Promise<HttpResponse> {
    const input = request?.body;

    try {
      const result = await this.useCases.create.action(input);

      if (result instanceof InvalidInputError) {
        return badRequest(result);
      }
      if (result instanceof CreateEntityError) {
        return serverError(result);
      }

      return created(result);
    } catch (error) {
      return serverError(error);
    }
  }

  async get(request: HttpRequest): Promise<HttpResponse> {
    const id = request?.params?.id;

    try {
      const result = await this.useCases.get.action(id);

      if (result instanceof NotFoundError) {
        return notFound(result);
      }
      if (result instanceof GetEntityError) {
        return serverError(result);
      }

      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }

  async list(): Promise<HttpResponse> {
    try {
      const result = await this.useCases.list.action();

      if (result instanceof ListEntityError) {
        return serverError(result);
      }

      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }

  async update(request: HttpRequest): Promise<HttpResponse> {
    const id = request?.params?.id;
    const input = request?.body;

    try {
      const result = await this.useCases.update.action(id, input);

      if (result instanceof InvalidInputError) {
        return badRequest(result);
      }
      if (result instanceof NotFoundError) {
        return notFound(result);
      }
      if (result instanceof UpdateEntityError) {
        return serverError(result);
      }

      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}