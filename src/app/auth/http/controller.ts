import {
  badRequest,
  conflict,
  created,
  HttpRequest,
  HttpResponse,
  notFound,
  serverError,
  unauthorized,
} from "@shared/http";
import { ConflictError, CreateEntityError, InvalidInputError, NotFoundError, UnauthorizedError } from "@app/errors";
import { AuthLoginUseCase, AuthRegisterUseCase } from "../use-cases";

export type UseCases = {
  login: AuthLoginUseCase,
  register: AuthRegisterUseCase
};

export default class CustomerHttpController {
  constructor(private useCases: UseCases) {}

  async login(request: HttpRequest): Promise<HttpResponse> {
    const input = request?.body;

    try {
      const result = await this.useCases.login.action(input);

      if (result instanceof InvalidInputError) {
        return badRequest(result);
      }
      if (result instanceof NotFoundError) {
        return notFound(result);
      }
      if (result instanceof UnauthorizedError) {
        return unauthorized(result);
      }
      if (result instanceof UnauthorizedError) {
        return serverError(result);
      }

      return created(result);
    } catch (error) {
      return serverError(error);
    }
  }

  async register(request: HttpRequest): Promise<HttpResponse> {
    const input = request?.body;

    try {
      const result = await this.useCases.register.action(input);

      if (result instanceof InvalidInputError) {
        return badRequest(result);
      }
      if (result instanceof ConflictError) {
        return conflict(result);
      }
      if (result instanceof CreateEntityError) {
        return serverError(result);
      }

      return created(result);
    } catch (error) {
      return serverError(error);
    }
  }
}