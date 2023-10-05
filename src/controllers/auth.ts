import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { JwtModel } from '../utils/jwt';


const generateJwt = (input: User): string => {
    const jwtObject: JwtModel = {
        userId: input.Id!,        
    }

    const token = jwt.sign(jwtObject, process.env.APP_KEY!, {expiresIn: '12h'});
    return token;
}

const validatePassword = async (input: User, password: string): Promise<boolean> => {
    const result = await bcrypt.compare(input.HashedPassword!, password)
    return result;
}

export const register: RequestHandler = async (req, res, next) => {
    const body = req.body;
    
    // Validate input
    if (false) {
        const error = new Error('[ERROR] Input is invalid');
        throw error;
    }

    const rInfo = {
        Email: body.Email,
        Password: body.Password
    }

    const hashedPassword = await bcrypt.hash(rInfo.Password, 12);
    const userModel = {
        Email: rInfo.Email,
        HashedPassword: hashedPassword,
        WhenCreated: new Date()
    }

    const user = await User.create(userModel);
    
    res.status(201).json({
        token: generateJwt(user)
    })
    res.send();
}

export const login: RequestHandler = async (req, res, next) => {
    const body = req.body;
    
    // Validate input
    if (false) {
        const error = new Error('[ERROR] Input is invalid');
        throw error;
    }

    const user = await User.findOne({
        where: {
            Email: body.Email
        }
    })

    if (user === null) {
        const error = new Error(`[ERROR] There is no User with email: ${body.Email}`)
        throw error;
    }

    if (await validatePassword(user, body.Password) === false) {
        const error = new Error(`[ERROR] Password is invalid`)
        throw error;
    }

    res.send(200).json({
        token: generateJwt(user)
    })
    res.send();
}