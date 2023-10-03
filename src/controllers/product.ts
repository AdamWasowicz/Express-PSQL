import { RequestHandler } from 'express';
import Product from '../models/product';

export const getProducts: RequestHandler = async (req, res, next) => {
    const products = await Product.findAll();
    
    if (!products) {
        const error = new Error('Error occured while fetching data');
        throw error;
    }

    res.status(200).json({
        products: products
    })

    res.send();
}

export const getProduct: RequestHandler = async (req, res, next) => {
    if (req.query.Id === null) {
        const error = new Error('Missing request field productId');
        throw error;
    }

    const desiredId: string = req.query.Id as string;
    const product = await Product.findOne({
        where: {
            Id: desiredId
        }
    })

    if (!product) {
        const error = new Error('There is no Product with that Id')
        throw error;
    }

    res.status(200).json({
        product: product
    })

    res.send();
}

export const postProduct: RequestHandler = async (req, res, next) => {
    if (req.body.product === null) {
        const error = new Error('Missing product field')
    }
    else {
        // Validate here
    }

    const product = await Product.create(req.body.product);
    if (!product) {
        const error = new Error('Error occured while creating new product');
        throw error;
    }

    res.status(201).json({
        product: product
    });

    res.send();

}

export const deleteProduct: RequestHandler = async (req, res, next) => {
    if (req.query.Id === null) {
        const error = new Error('Missing request field productId');
        throw error;
    }

    const Id: string = req.query.Id as string;

    await Product.destroy({
        where: {
            Id: Id
        }
    })

    res.status(204);
    res.send();
}