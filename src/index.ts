import dotenv from 'dotenv';
dotenv.config();

import express, { NextFunction, Request, Response } from 'express';

import { router } from './routers';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ mensagem: 'Conteúdo não encontrado.' });
});

app.listen(port, () => {
  console.log(`Server is running in the port ${port}`);
});
