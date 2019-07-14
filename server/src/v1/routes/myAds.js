import { Router } from 'express';
import { verifyAuthUser } from '../middlewares/verify';
import { fetchMyads } from '../controllers/property';

const router = Router();

router.use(verifyAuthUser);

router.get('/', fetchMyads);

export default router;