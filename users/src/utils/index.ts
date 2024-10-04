import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface Payload {
    email: string;
    password: string;
    iat: number;
}

export const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword
}

export const checkPassword = async (inputPassword: string, accountPassword: string): Promise<boolean> => {
    const result = await bcrypt.compare(inputPassword, accountPassword.trimEnd())
    return result
}

export const createToken = (email: string, password: string, secret: string):string => {
    const token = jwt.sign({email, password}, secret)
    return token
}

export const verifyToken = (accessToken: string, secret: string):Payload => {
    const result = jwt.verify(accessToken, secret)
    return result as Payload
}
