import { RequestHandler } from "express";

/**
 * Must be in development mode a.k.a NODE_ENV === 'development'
 * @returns next() if in development mode, 403 if not
 */
export const useDevOnly: RequestHandler = (req, res, next) => {
    if (process.env.NODE_ENV !== 'development') {
        res.status(403).send();
    }

    return next();
}