import {
  HttpRequest,
  HttpResponse,
  notFound,
  ok,
  serverError,
} from "@shared/http";
import { UserGetUseCase  } from "../use-cases";
import { GetEntityError, NotFoundError } from "@app/errors";

export type UseCases = {
  get: UserGetUseCase,
};

export default class CustomerHttpController {
  constructor(private useCases: UseCases) {}

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
}