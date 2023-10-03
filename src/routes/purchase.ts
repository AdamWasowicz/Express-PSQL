import express, { Router } from 'express';
import * as c from '../controllers/purchase';

const purchaseRouter: Router = express.Router();

purchaseRouter.post('', c.postPurchase);
purchaseRouter.get('/:Id', c.getPurchase);
purchaseRouter.get('/test', c.getPurchases);
purchaseRouter.delete('/:Id', c.deletePurchase);

export default purchaseRouter;