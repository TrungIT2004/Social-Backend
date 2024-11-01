import { UserService } from "../../services/user-services"
import e, { Request, Response } from 'express';
import { createToken, verifyToken } from "../../utils";
import { env } from "../../configs/config";

const userService = new UserService()

export const signUp = async (req: Request, res: Response) => { 
    const { username, email, password } = req.body

    if (!username || !email || !password) res.status(400).json({"msg": "Missing fields"})
    else {
        try {
            const result = await userService.createAccount(username, email, password)
            if (!result) res.status(400).json({"msg": "Account already exist!"})
            else res.status(201).json(result)
        } catch(err) {
            res.status(500).json(err)
        }
    }
}

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) res.status(400).json({"msg": "Missing fields"})

    try {
        const result = await userService.login(email, password) 
        if (result === 1) res.status(404).json({"msg": "Account doesn't exists"})
        if (result === 2) res.status(401).json({"msg": "Password incorrect"})
        if (typeof result === "object") {
            res.cookie('refreshToken', result.refreshToken, { secure: false, httpOnly: false })
            res.status(200).json({accessToken: result.accessToken, userid: result.userid})
        }
    } catch(err) {
            res.status(500).json(err)
    }
}

export const refresh = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) res.status(402).json({"msg": "Please Sign In"})
    else {
        try {
            const payload = verifyToken(refreshToken, env.SECRET_REFRESH)
            if (!payload.email && payload.password) {
                res.status(400).json({"msg": "Please Sign In Again"})
            } else {
                const newAccessToken = createToken(payload.email, payload.password, payload.userid, env.SECRET_ACCESS)
                res.status(200).json({accessToken: newAccessToken, userid: payload.userid})
            }
        } catch(err) {
            res.status(500).json(err)
        }
    }
}

export const signOut = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) res.status(402).json({"msg": "Please Sign In"})
    
    if (refreshToken) {
        try {
            res.clearCookie('refreshToken', { secure: false, httpOnly: false })
            res.status(200).json({"msg": "Sign Out"})
        } catch(err) {
            res.status(500).json(err)
        }
    }
}