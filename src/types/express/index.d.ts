export {}

declare global{
    namespace Express {
        export interface Request {
            isAuth?: boolean,
            token?: {
                token: string,
                userId: string
            }
        }
    }
}