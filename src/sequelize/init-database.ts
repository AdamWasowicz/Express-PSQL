import Product from "../models/product";
import User from "../models/user";
import Purchase from "../models/purchase";
import PurchasedProduct from "../models/purchasedProduct";
import SequelizeClient from "./client";
import Comment from "../models/comment";

const createRealtions = () => {
    // User -> Purchase
    User.hasMany(Purchase);
    Purchase.belongsTo(User, {
        foreignKey: 'UserId'
    });

    // Purchase -> PurchasedProduct
    Purchase.hasMany(PurchasedProduct);
    PurchasedProduct.belongsTo(Purchase, {
        foreignKey: "PurchaseId"
    });

    // PurchasedProduct -> Product
    PurchasedProduct.hasOne(Product);
    Product.belongsTo(PurchasedProduct, {
        foreignKey: 'ProductId'
    });

    // Product -> Comment
    Product.hasMany(Comment);
    Comment.belongsTo(Product, {
        foreignKey: 'ProductId'
    })

    // User -> Comment
    User.hasMany(Comment);
    Comment.belongsTo(User, {
        foreignKey: 'UserId'
    })
}


const initDatabase = async () => {
    const t = await SequelizeClient.transaction();

    try {
        await createRealtions();
        await SequelizeClient.sync();
    }
    catch (error) {
        console.log('[ERROR] Error occured while initing database')
        console.log(error)
        t.rollback();
        throw error;
    }
    
    t.commit();
}

export default initDatabase;