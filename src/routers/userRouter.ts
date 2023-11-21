import { Router } from 'express';

import { UserController } from '../controllers/UserController';

const user = new UserController();

const router = Router();

router.post('/users/signup', user.signUp);

router.post('/users/signin', user.signIn);

router.get('/users', user.findAll);

export { router };
