import { DataTypes as dt } from 'sequelize';
import sc from '../sequelize/client';

const Product = sc.define('Product', {
    Id: {
        type: dt.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    Name: {
        type: dt.STRING,
        allowNull: false,
    },

    Category: {
        type: dt.STRING,
        allowNull: false,
    },

    Price: {
        type: dt.DOUBLE,
        allowNull: false
    }
}, { freezeTableName: true });



export default Product;