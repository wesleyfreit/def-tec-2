import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class User {
  private user;

  constructor() {
    this.user = prisma.user;
  }

  createNewUser = async (
    nome: string,
    email: string,
    senha: string,
    telefones: { numero: string; ddd: string }[],
  ) => {
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
    const passwordChecked = await bcrypt.compare(requestPassword, userPassword);
    return passwordChecked;
  };

  updateLastUserLogin = async (id: string) => {
    const updated = await this.user.update({ data: { ultimo_login: new Date() }, where: { id } });
    return updated;
  };

  getUser = async (id: string) => {
    const user = await this.user.findFirst({ where: { id }, include: { telefones: true } });
    return user;
  };

  getAllUsers = async () => {
    const users = await this.user.findMany();
    return users;
  };

  removeUser = async (id: string) => {
    const removed = await this.user.delete({ where: { id } });
    return removed;
  };
}
