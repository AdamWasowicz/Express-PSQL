import { RequestHandler } from "express";

export const useDevOnly: RequestHandler = (req, res, next) => {
    if (process.env.NODE_ENV !== 'development') {
        res.status(403).send();
    }

    return next();
}