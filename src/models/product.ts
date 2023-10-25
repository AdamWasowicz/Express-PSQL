import { Model, DataTypes as dt } from 'sequelize';
import SequelizeClient from '../sequelize/client';

/**
 *  @openapi
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  Id:
 *                      type: number
 *                  Name: string
 *                      type: string
 *                  Category:
 *                      type: string
 *                      required: false
 *                  Price:
 *                      type: number
 */
class Product extends Model {
    Id: number | undefined;
    Name: string | undefined;
    Category: string | undefined;
    Price: number | undefined;
}

Product.init({
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
        allowNull: true,
    },

    Price: {
        type: dt.DOUBLE,
        allowNull: false
    }
}, {sequelize: SequelizeClient, freezeTableName: true });



export default Product;