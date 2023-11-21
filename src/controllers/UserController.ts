import dotenv from 'dotenv';
dotenv.config();

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../models/User';

const user = new User();

export class UserController {
  private secret;

  constructor() {
    this.secret = process.env.JWT_SECRET as string;
  }

  signUp = async (req: Request, res: Response) => {
    const { nome, email, senha, telefones } = req.body;
    try {
      const existingUser = await user.getUserByEmail(email);

      if (existingUser) return res.status(409).json({ mensagem: 'E-mail já existente.' });

      const userCreated = await user.createNewUser(nome, email, senha, telefones);

      const { id, data_criacao, data_atualizacao, ultimo_login } = userCreated;

      const token = jwt.sign({ id, nome }, this.secret, {
        expiresIn: 1800,
      });

      return res.status(201).json({ id, data_criacao, data_atualizacao, ultimo_login, token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messagem: 'Ocorreu um erro interno no servidor.' });
    }
  };

  signIn = async (req: Request, res: Response) => {
    const { email, senha } = req.body;
    try {
      const existingUser = await user.getUserByEmail(email);

      if (existingUser) {
        const checkPassword = await user.compareUserPassword(senha, existingUser.senha);

        if (checkPassword) {
          const { id, nome, data_criacao, data_atualizacao, ultimo_login } = existingUser;

          await user.updateLastUserLogin(id);
          const token = jwt.sign({ id, nome }, this.secret, {
            expiresIn: 1800,
          });

          return res.json({ id, data_criacao, data_atualizacao, ultimo_login, token });
        } else return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos.' });
      } else return res.status(404).json({ mensagem: 'Usuário e/ou senha inválidos.' });
    } catch (error) {
      return res.status(500).json({ messagem: 'Ocorreu um erro interno no servidor.' });
    }
  };

  findUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const existingUser = await user.getUser(id);

      if (existingUser) {
        const { nome, email, telefones } = existingUser;

        return res.json({ id, nome, email, telefones });
      } else return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    } catch (error) {
      return res.status(500).json({ messagem: 'Ocorreu um erro interno no servidor.' });
    }
  };
}
