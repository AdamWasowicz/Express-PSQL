import { Model, DataTypes as dt } from 'sequelize';
import SequelizeClient from '../sequelize/client';

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