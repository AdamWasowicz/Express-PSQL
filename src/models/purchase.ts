import { DataTypes as dt } from 'sequelize';
import sc from '../sequelize/client';

const Purchase = sc.define('Purchase', {
    Id: {
        type: dt.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    Date: {
        type: dt.DATE,
        allowNull: false
    }
}, { freezeTableName: true })

export default Purchase;