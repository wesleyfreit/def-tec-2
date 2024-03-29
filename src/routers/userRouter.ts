import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { messages } from 'joi-translation-pt-br';

import { UserController } from '../controllers/UserController';
import { userAuth } from '../middlewares/userAuth';

const user = new UserController();

const router = Router();

router.post(
  '/users/signup',
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        senha: Joi.string().min(8).required(),
        telefones: Joi.array().items(
          Joi.object()
            .keys({
              numero: Joi.string()
                .pattern(/^\d{1,}$/)
                .min(8)
                .max(9)
                .required(),
              ddd: Joi.string()
                .pattern(/^\d{1,}$/)
                .min(1)
                .max(3)
                .required(),
            })
            .required(),
        ),
      }),
    },
    { messages },
  ),
  user.signUp,
);

router.post(
  '/users/signin',
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        senha: Joi.string().min(8).required(),
      }),
    },
    { messages },
  ),
  user.signIn,
);

router.get(
  '/users/:id',
  celebrate(
    {
      [Segments.PARAMS]: {
        id: Joi.string().uuid({ version: 'uuidv4' }).required(),
      },
    },
    {
      messages: messages,
    },
  ),
  userAuth,
  user.findUser,
);

export { router };
