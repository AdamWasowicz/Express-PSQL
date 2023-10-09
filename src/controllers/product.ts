import { RequestHandler } from 'express';
import Product from '../models/product';
import { createProductDto, updateProductDto } from '../models/dto/product';

export const getProducts: RequestHandler = async (req, res, next) => {
    const products = await Product.findAll();
    
    if (!products) {
        return res.status(404).send();
    }

    return res.status(200).json({products: products}).send();
}

export const getProduct: RequestHandler = async (req, res, next) => {
    if (req.query.Id === null) {
        return res.status(400).json({message: 'Missing guery param: Id'}).send();
    }

    const desiredId: string = req.query.Id as string;
    const product = await Product.findOne({
        where: { Id: desiredId }
    })

    if (!product) {
        res.status(404).send();
    }

    return res.status(200).json({ product: product }).send();
}

export const postProduct: RequestHandler = async (req, res, next) => {
    const bodyContent: createProductDto = req.body;
    
    // Validate
    if (false) {
        return res.status(400).json({ message: 'Request body is invalid'}).send()
    }
    
    const product = await Product.create(bodyContent);
    if (!product) {
        return res.status(500).json({message: "Error occured while creating rows"}).send();
    }

    return res.status(201).json({ product: product }).send();
}

export const deleteProduct: RequestHandler = async (req, res, next) => {
    if (req.query.Id === null) {
        return res.status(400).json({message: 'Missing guery param: Id'}).send();
    }

    const Id: string = req.query.Id as string;
    await Product.destroy({
        where: {
            Id: Id
        }
    })

    return res.status(204).send();
}

export const patchProduct: RequestHandler = async (req, res, next) => {
    const bodyContent: updateProductDto = req.body;

    // Validate
    if (false) {
        return res.status(400).json({ message: 'Request body is invalid'}).send()
    }

    const product = await Product.findOne({
        where: {
            Id: bodyContent.Id
        }
    })
    if (product === null) {
        return res.status(404).send();
    }

    // Change values
    product.Name = bodyContent.Name;
    product.Price = bodyContent.Price;
    product.Category = bodyContent.Category;
    
    try {
        await product.save();
        return res.status(200).json(product).send();
    }
    catch (error) {
        console.log(error);
        return res.status(500).send();
    }
}