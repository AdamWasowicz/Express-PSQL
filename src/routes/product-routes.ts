import express, { Router } from 'express';
import * as c from '../controllers/product-controller';
import { requireAuth } from '../middleware/use-jwt-auth';
import { useDevOnly } from '../middleware/use-dev-only';

const productRouter: Router = express.Router();

productRouter.get('/test', useDevOnly, c.getProducts);
productRouter.get('/:Id', c.getProduct);
productRouter.post('', requireAuth, c.postProduct);
productRouter.delete('/:Id', requireAuth, c.deleteProduct)

export default productRouter;