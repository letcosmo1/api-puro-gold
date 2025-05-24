import { logger } from "@infra/logger";
import { HttpResponse } from "./http-response";

export const badRequest = (error: Error, data: any = null): HttpResponse => {
  if (!data) {
    return {
      statusCode: 400,
      body: { success: false, errorMessage: error.message },
    };
  }

  return {
    statusCode: 400,
    body: { success: false, errorMessage: error.message, data },
  };
};

export const notFound = (error?: Error): HttpResponse => ({
  statusCode: 404,
  body: { success: false, errorMessage: error?.message || "not found" },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ok = (data: any = {}): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const created = (data: any = {}): HttpResponse => ({
  statusCode: 201,
  body: data,
});

export const noContent = (): Omit<HttpResponse, "body"> => ({
  statusCode: 204,
});

export const serverError = (error: Error | unknown): HttpResponse => {
  if (error instanceof Error) {
    logger.error(error);
    return {
      statusCode: 500,
      body: { success: false, errorMessage: error.message },
    };
  }

  return {
    statusCode: 500,
    body: { success: false, errorMessage: "Problemas em processar a requisição pelo servidor" },
  };
};

export const unauthorized = (error: Error): HttpResponse => ({
  statusCode: 401,
  body: { success: false, errorMessage: error.message },
});

export const forbidden = (error?: Error): HttpResponse => ({
  statusCode: 403,
  body: { success: false, errorMessage: error?.message ||  "" },
});

export const conflict = (error?: Error): HttpResponse => ({
  statusCode: 409,
  body: { success: false, errorMessage: error?.message || "conflict" },
});