import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization?.replace('Bearer ', '') as string;
  const secret = process.env.JWT_SECRET as string;

  jwt.verify(authorization, secret, (err, decoded) => {
    if (err) {
      switch (err.message) {
        case 'jwt must be provided':
          return res.status(400).json({ mensagem: 'Não autorizado.' });
        case 'jwt expired':
          return res.status(400).json({ mensagem: 'Sessão Inválida.' });
        default:
          return res.status(500).json({ messagem: 'Ocorreu um erro interno no servidor.' });
      }
    } else {
      const { id } = req.params;
      const payload = decoded as JwtPayload;

      if (payload.id === id) next();
      else return res.status(400).json({ mensagem: 'Não autorizado.' });
    }
  });
};
