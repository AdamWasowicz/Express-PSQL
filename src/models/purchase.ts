import { Model, DataTypes as dt } from 'sequelize';
import SequelizeClient from '../sequelize/client';

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