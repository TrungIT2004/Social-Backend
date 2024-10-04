import { Request, Response } from "express"
import { verifyToken } from "../../utils"
import { env } from "../../configs/config"

export const authorizeToken = async (req: Request, res: Response, next: any) => {
    const authHeader = req.headers['authorization']
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        const payload = verifyToken(token, env.SECRET_ACCESS)

        if (payload.email && payload.password) {
            next()
        }
    }
}
