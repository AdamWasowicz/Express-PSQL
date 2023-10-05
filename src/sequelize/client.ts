import {Sequelize} from 'sequelize';
import dotenv from "dotenv";
import dotenvExpand from 'dotenv-expand';

const envConfig = dotenv.config();
dotenvExpand.expand(envConfig)

const dbPort = process.env.DB_PORT_OUT!;
const SequelizeClient = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.APP_HOST,
        dialect: 'postgres',
        port: +dbPort,
        define: {
            timestamps: false,
        },
        logging: false
    }
);

export default SequelizeClient;