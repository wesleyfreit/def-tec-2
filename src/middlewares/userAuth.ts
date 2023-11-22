import { NextFunction, Request, Response } from 'express';
import { verifyTokenJwt } from '../utils/jwtFunctions';

export const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization?.replace('Bearer ', '') as string;

  try {
    const { id } = req.params;

    const response = verifyTokenJwt(authorization);
    const tokenId = response as unknown as string;

    if (tokenId !== id) return res.status(400).json({ mensagem: 'Não autorizado.' });
    else return next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    switch (error.message) {
      case 'jwt must be provided':
        return res.status(400).json({ mensagem: 'Não autorizado.' });
      case 'jwt expired':
        return res.status(400).json({ mensagem: 'Sessão Inválida.' });
      case 'invalid token':
        return res.status(400).json({ mensagem: 'Não autorizado.' });
      default:
        return res.status(500).json({ messagem: 'Ocorreu um erro interno no servidor.' });
    }
  }
};
