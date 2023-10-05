import { Model, DataTypes as dt } from 'sequelize';
import SequelizeClient from '../sequelize/client';

class User extends Model {
    Id: number | undefined | null;
    FirstName: string | undefined | null;
    Surname: string | undefined | null;
    Email: string | undefined;
    HashedPassword: string | undefined;
    WhenCreated: string | undefined
}

User.init({
    Id: {
        type: dt.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    FirstName: {
        type: dt.STRING,
        allowNull: true,
    },

    Surname: {
        type: dt.STRING,
        allowNull: true,
    },

    Email: {
        type: dt.STRING,
        allowNull: false
    },

    HashedPassword: {
        type: dt.STRING,
        allowNull: false
    },

    WhenCreated: {
        type: dt.DATE,
        allowNull: false
    }
}, {sequelize: SequelizeClient, freezeTableName: true})

export default User;