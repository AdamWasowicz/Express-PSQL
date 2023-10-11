import { NextFunction, Request, Response } from 'express';

const useErrorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
    const status = 500;
    const message = error.message;

    return response.status(status).send({ status, message, })
}

export default useErrorHandler;