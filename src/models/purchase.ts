import { Model, DataTypes as dt } from 'sequelize';
import SequelizeClient from '../sequelize/client';

/**
 *  @openapi
 *  components:
 *      schemas:
 *          Purchase:
 *              type: object
 *              properties:
 *                  Id:
 *                      type: number
 *                  Date:
 *                      type: string
 *                      format: date-time
 *                  UserId:
 *                      type: number
 */
class Purchase extends Model {
    Id: number | undefined;
    Date: Date | undefined;

    // FK
    UserId: number | undefined;
}

Purchase.init({
    Id: {
        type: dt.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    Date: {
        type: dt.DATE,
        allowNull: false
    }
}, {sequelize: SequelizeClient, freezeTableName: true })

export default Purchase;