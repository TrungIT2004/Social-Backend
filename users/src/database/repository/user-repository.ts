import pool from "../connection"
import friendReqModel from "../schemas/friend-reqs-schema"

export class UserRepository {
    static deleteFriendRequest(requestid: string) {
        throw new Error("Method not implemented.")
    }
    static addFriend: any
    static createFriendRequest(senderid: string, senderName: string, receiverid: string, receiverName: string) {
        throw new Error("Method not implemented.")
    }
    checkUser = async (email: string): Promise<object | boolean> => {
        const text = `SELECT * FROM users WHERE email= $1`
        const value = [email]

        const res = await pool.query(text, value)

        if ( res.rows[0]) return res.rows[0]
        return false
    }

    createUser = async (uuid: string, username: string, email: string, password: string): Promise<object> => {
        const text = `INSERT INTO users(userid, username, email, password_hash) VALUES($1, $2, $3, $4) RETURNING *`
        const values = [uuid, username, email, password]

        const res = await pool.query(text, values)
        return res.rows[0]
    }

    createFriendRequest = async (senderid: string, senderName: string, receiverid: string, receiverName: string) => {
        const newFriendRequest = await friendReqModel.create({
            senderid,
            senderName,
            receiverid,
            receiverName,
        })

        return newFriendRequest
    }

    deleteFriendRequest = async (requestid: string) => {
        const deletedFriendRequest = await friendReqModel.findByIdAndDelete(requestid)
        return deletedFriendRequest
    }

    addFriend = async (senderid: string, receiverid: string) => {
        const text = `UPDATE users SET friends = friend || ARRAY[$1] WHERE userid=$2`
        const values1 = [senderid, receiverid]
        const values2 = [receiverid, senderid]

        const query1 = await pool.query(text, values1)
        const query2 = await pool.query(text, values2)

        return [query1.rows[0], query2.rows[0]]
    }
}