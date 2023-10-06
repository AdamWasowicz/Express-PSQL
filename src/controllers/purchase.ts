import { RequestHandler } from 'express';
import Purchase from '../models/purchase';
import PurchasedProduct from '../models/purchasedProduct';
import SequelizeClient from '../sequelize/client';

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
    if (req.body.purchase === null) {
        res.status(400).json({message: '[ERROR] Request body is missing field: purchase'}).send();
    }
    else {
        // Validate input here
    }

    const purchaseData: {numberOfItems: number, priceOfOneItem: number}[] = req.body.purchase;
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
        const promiseArray = purchaseData.map((item) => {
            return PurchasedProduct.create({
                NumberOfItems: item.numberOfItems, 
                ProductPrice: item.priceOfOneItem,
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