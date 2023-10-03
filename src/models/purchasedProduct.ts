import { DataTypes as dt } from 'sequelize';
import sc from '../sequelize/client';
import Purchase from './purchase';

const PurchasedProduct = sc.define('PurchasedProduct', {
    id: {
        type: dt.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    numberOfItems: {
        type: dt.INTEGER,
        allowNull: false
    },

    priceOfOneItem: {
        type: dt.DOUBLE,
        allowNull: false
    }
}, { freezeTableName: true })

export default PurchasedProduct;