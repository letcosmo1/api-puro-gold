import { User } from '@app/user/types';
import jwt from 'jsonwebtoken';


export class JwtService {
  private secret = process.env.JWT_SECRET || 'supersecret';

  constructor() {}

  generateToken(payload: User): string {
    return jwt.sign(payload, this.secret, { expiresIn: '6h' });
  }

  verifyToken(token: string): jwt.JwtPayload | string {
    return jwt.verify(token, this.secret);
  }
}