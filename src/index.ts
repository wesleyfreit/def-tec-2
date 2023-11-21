import dotenv from 'dotenv';
dotenv.config();

import { isCelebrateError } from 'celebrate';
import express, { Errback, NextFunction, Request, Response } from 'express';

import { router } from './routers';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ mensagem: 'Conteúdo não encontrado.' });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  if (isCelebrateError(err)) {
    let message = err.message;

    message +=
      ': ' +
      Object.fromEntries(err.details).body.details[0].message.replace('"', '').replace('"', '');
    return res.status(400).json({ mensagem: message });
  } else {
    res.status(500).json({ messagem: 'Ocorreu um erro interno no servidor.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running in the port ${port}`);
});
