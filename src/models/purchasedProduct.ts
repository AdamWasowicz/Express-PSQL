import { Model, DataTypes as dt } from 'sequelize';
import SequelizeClient from '../sequelize/client';

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