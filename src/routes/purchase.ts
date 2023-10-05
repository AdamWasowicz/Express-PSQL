import express, { Router } from 'express';
import * as c from '../controllers/purchase';
import { requireAuth } from '../middleware/use-jwt-auth';

const purchaseRouter: Router = express.Router();

purchaseRouter.post('', requireAuth, c.postPurchase);
purchaseRouter.get('/:Id', c.getPurchase);
purchaseRouter.get('/test', c.getPurchases);
purchaseRouter.delete('/:Id', requireAuth, c.deletePurchase);

export default purchaseRouter;