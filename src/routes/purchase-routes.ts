import express, { Router } from 'express';
import * as c from '../controllers/purchase-controller';
import { requireAuth } from '../middleware/use-jwt-auth';
import { useDevOnly } from '../middleware/use-dev-only';

const purchaseRouter: Router = express.Router();

purchaseRouter.post('', requireAuth, c.postPurchase);
purchaseRouter.get('/:Id', c.getPurchase);
purchaseRouter.get('/test', useDevOnly, c.getPurchases);
purchaseRouter.delete('/:Id', requireAuth, c.deletePurchase);
purchaseRouter.patch('', requireAuth, c.patchPurchase)

export default purchaseRouter;