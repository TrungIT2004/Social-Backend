import { UserRepository } from "../database/repository/user-repository"
import { checkPassword, hashPassword, createToken } from "../utils"
import { v4 as uuidv4 } from 'uuid'
import { env } from "../configs/config"

interface Tokens {
    accessToken: string;
    refreshToken: string;
    userid: string;
}


export class UserService {
    UserRepository: any

    constructor() {
        this.UserRepository = new UserRepository()
    }

    createAccount = async (username: string, email: string, password: string): Promise<object | boolean | undefined> => {
        const userExist = await this.UserRepository.checkUser(email) 

        if (userExist) return false

        try {
            const hashedPassword = await hashPassword(password)
            const userid = uuidv4()
            const res = await this.UserRepository.createUser(userid, username, email, hashedPassword)
            return res
        } catch(err) {
            console.log(err)
            return 
        }
    }

    login = async (email: string, password: string): Promise<Tokens | number> => {
        const userExist = await this.UserRepository.checkUser(email)

        if (userExist) {
            try {
                const validatePassword = await checkPassword(password, userExist.password_hash)

                if (validatePassword) {
                    const accessToken = createToken(email, password, userExist.userid, env.SECRET_ACCESS)
                    const refreshToken = createToken(email, password, userExist.userid, env.SECRET_REFRESH)
                    return { accessToken, refreshToken, userid: userExist.userid } as Tokens
                }

                return 2
            } catch(err) {
                console.log(err)
            }
        }

        return 1
    }
}