import express, { Router } from 'express';
import * as c from '../controllers/product';

const productRouter: Router = express.Router();

productRouter.get('/test', c.getProducts);
productRouter.get('/:Id', c.getProduct);
productRouter.post('', c.postProduct);
productRouter.delete('/:Id', c.deleteProduct)

export default productRouter;