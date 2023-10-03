import dotenv from "dotenv";
import dotenvExpand from 'dotenv-expand';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import useDevCORS from "./middleware/use-dev-cors";
import useAuth from "./middleware/use-jwt-auth";
import productRouter from './routes/product';
import purchaseRouter from './routes/purchase';
import authRouter from './routes/auth';
import useErrorHandler from "./middleware/use-error-handling";
import sequelizeConfig from "./sequelize/client";
import initDatabase from "./sequelize/init-database";

// Config env
const envConfig = dotenv.config();
dotenvExpand.expand(envConfig)

// Create app
const app: Express = express();

// Services
app.use(bodyParser.json());
app.use(useDevCORS);
app.use(useAuth);

// REST
app.use('/product', productRouter);
app.use('/purchase', purchaseRouter);
app.use('/auth', authRouter);

// Middleware
app.use(useErrorHandler);

const dbPort = process.env.DB_PORT_OUT!;
const sequelize = sequelizeConfig;

// Start app
sequelize.authenticate()
    .then((result) => {
        initDatabase();

        console.log(`[SYSTEM] app started on port ${+process.env.APP_PORT_INSIDE!}`)
        app.listen(+process.env.APP_PORT_INSIDE!, '0.0.0.0')
    })
    .catch((error) => {
        console.log(`[ERROR] Could not connect to database (port: ${dbPort})`)
    })
