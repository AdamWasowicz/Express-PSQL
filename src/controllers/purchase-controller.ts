import { RequestHandler } from 'express';
import Purchase from '../models/purchase';
import PurchasedProduct from '../models/purchasedProduct';
import SequelizeClient from '../sequelize/client';
import { CreatePurchaseDto } from '../models/dto/purchase-dto';
import { AddPurchasedProductDto } from '../models/dto/purchasedProducts-dto';

export const getPurchases: RequestHandler = async (req, res, next) => {
    const purchases = (await Purchase.findAll({
        include: PurchasedProduct
    }));

    if (!purchases) {
        res.status(500).send();
    }

    res.status(200).json({purchases}).send();
}

export const getPurchase: RequestHandler = async (req, res, next) => {
    if (req.query.Id === null) {
        res.status(400).json({message: 'Request missing querry param: Id'}).send();
    }
    const Id = req.query.Id;

    const purchase = await Purchase.findOne({
        where: { Id: Id },
        include: PurchasedProduct
    });

    if (purchase === null) {
        res.status(404).send();
    }

    res.status(200).json(purchase).send();
}

export const postPurchase: RequestHandler = async (req, res, next) => {
    // Validate input
    if (false) {
        res.status(400).json({message: 'Request body is missing field: purchasedProducts'}).send();
    }

    const requestBody: CreatePurchaseDto = req.body;
    let purchaseId: string | undefined = undefined;
    const transaction = await SequelizeClient.transaction();
    
    try {
        // Purchase
        const purchase = await Purchase.create({
            Date: new Date(), 
            UserId: req.token?.userId
        })
        purchaseId = purchase.dataValues.Id;

        // PurchasedProducts
        const promiseArray = requestBody.purchasedProducts.map((item) => {
            return PurchasedProduct.create({
                ProductId: item.productId,
                NumberOfItems: item.numberOfItems, 
                ProductPrice: item.productPrice,
                PurchaseId: purchaseId,
            })
        })

        await Promise.all(promiseArray);
        await transaction.commit();

        const output = await Purchase.findOne({
            where: { Id: purchaseId },
            include: PurchasedProduct
        })

        res.status(201).json(output).send();
    }
    catch (error) {
        console.log('[ERROR] Error occured while creating new rows');
        console.log(error)
        await transaction.rollback();
        res.status(500).send();
    }    
}

export const deletePurchase: RequestHandler = async (req, res, next) => {
    if (req.query.Id === null) {
        res.status(405).json({message: 'Request missing querry param: Id'})
            .send();
    }
    const Id = req.query.Id;

    const transaction = await SequelizeClient.transaction();
    try {
        const purchase = await Purchase.findOne({
            where: { 
                Id: Id, 
                UserId: req.token?.userId 
            },
            include: PurchasedProduct
        });

        if (purchase?.UserId !== req.token?.userId) {
            transaction.commit();
            res.status(403).json({message: "This user can't edit this resource"}).send();
        }

        if (purchase === null) {
            res.status(404).json({message: `Purchase with Id: ${Id} not found`})
                .send();
        }
        else {
            await purchase.destroy();
            await purchase.save();
            await transaction.commit();
        }
    }
    catch (error) {
        console.log('[ERROR] Error occured while deleting row');
        await transaction.rollback();
        res.status(500).send();
    }

    res.status(204).send();
}

export const patchPurchase: RequestHandler = async (req, res, next) => {
    // Validate input
    if (false) {
        return res.status(400).json({message: "Invalid body content"}).send();
    }

    const requestBody: AddPurchasedProductDto = req.body;
    const transaction = await SequelizeClient.transaction();

    try {
        const purchase = await Purchase.findOne({
            where: {
                Id: requestBody.purchaseId
            }
        })

        const promiseArray = requestBody.purchasedProducts.map((item) => {
            return PurchasedProduct.create({
                ProductId: item.productId,
                NumberOfItems: item.numberOfItems, 
                ProductPrice: item.productPrice,
                PurchaseId: purchase?.Id,
            })
        })

        await Promise.all(promiseArray);
        await transaction.commit();

        const output = await Purchase.findOne({
            where: { Id: purchase?.Id },
            include: PurchasedProduct
        })

        return res.status(200).json(output).send();
        
    }
    catch (error) {
        console.log('[ERROR] Error occured while creating new rows');
        console.log(error)
        await transaction.rollback();
        return res.status(500).send();
    }
}