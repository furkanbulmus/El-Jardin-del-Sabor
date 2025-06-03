// routes/testProtected.ts

import { Router, Response } from 'express';
import { verifyToken, AuthRequest } from '../middlewares/auth';

const router = Router();

// GET /api/test/protected
router.get('/protected', verifyToken, (req: AuthRequest, res: Response) => {
  res.json({
    message: 'Bu korumalı bir route, hoş geldin!',
    user: req.user, // JWT içindeki payload burada
  });
});

export default router;
