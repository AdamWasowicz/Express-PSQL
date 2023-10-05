import express, { Router } from 'express';
import * as c from '../controllers/product';
import { requireAuth } from '../middleware/use-jwt-auth';

const productRouter: Router = express.Router();

productRouter.get('/test', c.getProducts);
productRouter.get('/:Id', c.getProduct);
productRouter.post('', requireAuth, c.postProduct);
productRouter.delete('/:Id', requireAuth, c.deleteProduct)

export default productRouter;