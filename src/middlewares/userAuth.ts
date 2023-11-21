import { NextFunction, Request, Response } from 'express';

export const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  next();
};
