import { Model, DataTypes as dt } from 'sequelize';
import SequelizeClient from '../sequelize/client';

/**
 *  @openapi
 *  components:
 *      schemas:
 *          Comment:
 *              type: object
 *              properties:
 *                  Id:
 *                      type: number
 *                  Content:
 *                      type: string
 *                  Date:
 *                      type: string
 *                      format: date-time
 *                  UserId:
 *                      type: number
 *                  ProductId:
 *                      type: number
 */
class Comment extends Model {
    Id: number | undefined;
    Content: string | undefined;
    Date: Date | undefined

    // FK
    UserId: number | undefined;
    ProductId: number | undefined;
}

Comment.init({
    Id: {
        type: dt.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    Content: {
        type: dt.STRING,
        allowNull: false,
    },
}, {sequelize: SequelizeClient, freezeTableName: true})

export default Comment