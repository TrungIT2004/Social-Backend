import pool from "../connection"

export class UserRepository {
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
}