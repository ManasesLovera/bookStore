import { RequestHandler, Router } from 'express';
import { proxyRequest } from '../controllers/gatewayController';
import { authenticate } from '../middleware/authMIddleware';

const router = Router();

router.post('/createUser', proxyRequest);

router.get('/getAllItems', authenticate as unknown as RequestHandler, proxyRequest);


export default router;
