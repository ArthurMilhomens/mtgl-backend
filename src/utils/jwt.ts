import jwt from 'jsonwebtoken';
import createError from 'http-errors';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";

interface IAccessToken {
    signAccessToken(payload: any): Promise<unknown>;
    verifyAccessToken(token: any): Promise<unknown>;
}

export class Token implements IAccessToken {
    signAccessToken(payload: any) {
        return new Promise((resolve, reject) => {
            jwt.sign({ payload }, accessTokenSecret, {
            }, (err: any, token: any) => {
                if (err) {
                    console.log("token ---------->", accessTokenSecret)
                    reject(createError.InternalServerError())
                }
                resolve(token)
            })
        })
    }

    async verifyAccessToken(token: any) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, accessTokenSecret, (err: any, payload: any) => {
                if (err) {
                    const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message
                    return reject({
                        message
                    })
                }
                resolve(payload)
            })
        }).catch((err: any) => {
            return false
        });
    }
}