import bcrypt from 'bcryptjs';

export class BcryptService {
  private saltRounds = 10;

  constructor(saltRounds?: number) {
    if (saltRounds) this.saltRounds = saltRounds;
  }

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
  }
}