import { Model, DataTypes as dt } from 'sequelize';
import SequelizeClient from '../sequelize/client';

/**
 *  @openapi
 *  components:
 *      schemas:
 *          User:
 *              type: object
 *              properties:
 *                  Id:
 *                      type: number
 *                  FirstName:
 *                      type: string
 *                  Surname:
 *                      type: string
 *                  Email:
 *                      type: string
 *                  HashedPassword:
 *                      type: string
 *                  WhenCreated:
 *                      type: string
 *                      format: date-time
 */
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