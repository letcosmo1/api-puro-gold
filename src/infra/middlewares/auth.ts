import { UnauthorizedError } from "@app/errors";
import { JwtService } from "@infra/jwt-service";
import { forbidden, unauthorized } from "@shared/http";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const jwtService = new JwtService();

  const authHeader = req.headers.authorization;

  if(!authHeader) {
    const httpResponse = unauthorized(new UnauthorizedError("Token não enviado."));
    res.status(httpResponse.statusCode).json(httpResponse.body);
    return;
  }

  try {
    const token = authHeader.split(' ')[1];
    req.user = jwtService.verifyToken(token); 
    next();
  } catch (err) {
    const httpResponse = forbidden(new UnauthorizedError("Token inválido"));
    res.status(httpResponse.statusCode).json(httpResponse.body);
    return;
  }
};