import { Model, DataTypes as dt } from 'sequelize';
import SequelizeClient from '../sequelize/client';

/**
 *  @openapi
 *  components:
 *      schemas:
 *          PurchasedProduct:
 *              type: object
 *              properties:
 *                  Id:
 *                      type: number
 *                  NumberOfItems:
 *                      type: number
 *                  ProductPrice:
 *                      type: number
 *                  ProductId:
 *                      type: number
 *                  PurchaseId:
 *                      type: number
 */
class PurchasedProduct extends Model {
    Id: number | undefined;
    NumberOfItems: number | undefined;
    ProductPrice: number | undefined;

    // FK
    ProductId: number | undefined;
    PurchaseId: number | undefined;
}

PurchasedProduct.init({
    Id: {
        type: dt.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    NumberOfItems: {
        type: dt.INTEGER,
        allowNull: false
    },

    ProductPrice: {
        type: dt.DOUBLE,
        allowNull: false
    }
}, {sequelize: SequelizeClient, freezeTableName: true })

export default PurchasedProduct;