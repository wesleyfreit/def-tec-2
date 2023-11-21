import { Request, Response } from 'express';

export class UserController {
  signUp = async (req: Request, res: Response) => {
    const body = req.body;
    res.json({ mensagem: body });
  };

  signIn = async (req: Request, res: Response) => {
    const body = req.body;
    res.json({ mensagem: body });
  };

  findAll = async (req: Request, res: Response) => {
    res.json({ messagem: 'todos os usuários' });
  };
}
