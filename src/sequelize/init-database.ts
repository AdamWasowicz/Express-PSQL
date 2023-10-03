import Product from "../models/product";
import Purchase from "../models/purchase";
import PurchasedProduct from "../models/purchasedProduct";
import SequelizeClient from "./client";

const createRealtions = () => {
    // Purchase -> PurchasedProduct
    Purchase.hasMany(PurchasedProduct);
    PurchasedProduct.belongsTo(Purchase);
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
    }
    t.commit();
}

export default initDatabase;