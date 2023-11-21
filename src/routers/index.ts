import { Router } from 'express';

import { router as userRouter } from './userRouter';

const router = Router();

router.use('/api/v1', userRouter);

export { router };
