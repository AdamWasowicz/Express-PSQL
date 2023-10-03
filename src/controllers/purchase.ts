import { RequestHandler } from 'express';
import Purchase from '../models/purchase';
import PurchasedProduct from '../models/purchasedProduct';
import SequelizeClient from '../sequelize/client';

export const getPurchases: RequestHandler = async (req, res, next) => {
    const purchases = (await Purchase.findAll({
        include: PurchasedProduct
    }));

    if (!purchases) {
        const error = new Error('Error occured while fetching data');
        throw error;
    }

    res.status(200).json({purchases})
    res.send();
}

export const getPurchase: RequestHandler = async (req, res, next) => {
    if (req.query.Id === null) {
        const error = new Error('Request missing querry param: Id');
        throw error;
    }

    const Id = req.query.Id;

    const purchase = await Purchase.findOne({
        where: {
            Id: Id
        },
        include: PurchasedProduct
    });

    if (purchase === null) {
        const error = new Error(`Cannot find row with Id: ${Id}`);
        throw error;
    }

    res.status(200).json({purchase})
    res.send();
}

export const postPurchase: RequestHandler = async (req, res, next) => {
    if (req.body.purchase === null) {
        const error = new Error('Missing input data')
    }
    else {
        // Validate here
    }

    const purchaseData: {numberOfItems: number, priceOfOneItem: number}[] = req.body.purchase;
    const transaction = await SequelizeClient.transaction();
    let purchaseId: string | undefined = undefined;
    let purchasedItemsArray: any[] = [];
    
    try {
        // Purchase
        const purchase = await Purchase.create({date: new Date()})
        purchaseId = purchase.dataValues.Id;

        // PurchasedProducts
        const promiseArray = purchaseData.map((item) => {
            return PurchasedProduct.create({
                numberOfItems: item.numberOfItems, 
                priceOfOneItem: item.priceOfOneItem,
                PurchaseId: purchaseId
            })
        })
        await Promise.all(promiseArray);
        await transaction.commit();

        const output = await Purchase.findOne({
            where: {
                id: purchaseId
            },
            include: PurchasedProduct
        })

        res.status(201).json({output})
        res.send();
    }
    catch (error) {
        console.log('[ERROR] Error occured while creating new rows');
        console.log(error);
        await transaction.rollback();
    }    
}

export const deletePurchase: RequestHandler = async (req, res, next) => {
    if (req.query.Id === null) {
        const error = new Error('Request missing querry param: Id');
        throw error;
    }
    const Id = req.query.Id;

    const transaction = await SequelizeClient.transaction();
    try {
        const purchase = await Purchase.findOne({
            where: {
                Id: Id
            },
            include: PurchasedProduct
        });

        if (purchase === null) {
            const error = new Error(`[ERROR] Purchase with Id: ${Id} not found`);
            throw error;
        }

        await purchase.destroy();
        await purchase.save();
        await transaction.commit();
    }
    catch (error) {
        await transaction.rollback();
        console.log(`[ERROR] Error occured while deleting Purchase`)
        console.log(error);
        throw error;
    }

    res.status(204);
    res.send();
}