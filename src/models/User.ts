import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class User {
  private user;

  constructor() {
    this.user = prisma.user;
  }

  createNewUser = async (nome: string, email: string, senha: string, telefones: []) => {
    const hash = await bcrypt.hash(senha, 10);
    const newUser = {
      nome,
      email: email.toLowerCase(),
      senha: hash,
    };

    const userCreated = await this.user.create({
      data: { ...newUser, telefones: { create: telefones } },
    });

    return userCreated;
  };

  getUserByEmail = async (email: string) => {
    const existingUser = await this.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
    });

    return existingUser;
  };

  compareUserPassword = async (requestPassword: string, userPassword: string) => {
    const checkPassword = await bcrypt.compare(requestPassword, userPassword);

    return checkPassword;
  };

  updateLastUserLogin = async (id: string) => {
    await this.user.update({ data: { ultimo_login: new Date() }, where: { id } });
  };

  getUser = async (id: string) => {
    const user = await this.user.findFirst({ where: { id }, include: { telefones: true } });
    return user;
  };
}
