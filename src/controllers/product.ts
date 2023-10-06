import { RequestHandler } from 'express';
import Product from '../models/product';

export const getProducts: RequestHandler = async (req, res, next) => {
    const products = await Product.findAll();
    
    if (!products) {
        res.status(500).send();
    }

    res.status(200).json({products: products}).send();
}

export const getProduct: RequestHandler = async (req, res, next) => {
    if (req.query.Id === null) {
        res.status(400).json({message: 'Missing guery param: Id'}).send();
    }

    const desiredId: string = req.query.Id as string;
    const product = await Product.findOne({
        where: { Id: desiredId }
    })

    if (!product) {
        res.status(404).send();
    }

    res.status(200).json({ product: product }).send();
}

export const postProduct: RequestHandler = async (req, res, next) => {
    if (req.body.product === null) {
        res.status(400).json({ message: 'Request body is missing field: product'}).send()
    }
    else {
        // Validate input here
    }

    const product = await Product.create(req.body.product);
    if (!product) {
        res.status(500).send();
    }

    res.status(201).json({ product: product }).send();
}

export const deleteProduct: RequestHandler = async (req, res, next) => {
    if (req.query.Id === null) {
        res.status(400).json({message: 'Missing guery param: Id'}).send();
    }

    const Id: string = req.query.Id as string;
    await Product.destroy({
        where: {
            Id: Id
        }
    })

    res.status(204).send();
}