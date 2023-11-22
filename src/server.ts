import { isCelebrateError } from 'celebrate';
import express, { Errback, NextFunction, Request, Response } from 'express';

import { router } from './routers';

const app = express();

app.use(express.json());
app.use(router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ mensagem: 'Conteúdo não encontrado.' });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  if (isCelebrateError(err)) {
    let message = err.message;

    if (err.details && err.details.get('body')) {
      const firstError = err.details.get('body')!.details[0];

      if (firstError) message += `: ${firstError.message.replace(/"/g, '')}`;
    }

    return res.status(400).json({ mensagem: message });
  } else res.status(500).json({ mensagem: 'Ocorreu um erro interno no servidor.' });
});

export { app };
