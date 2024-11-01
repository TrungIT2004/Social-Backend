import pool from "../connection"
import { v4 as uuidv4 } from 'uuid'

export interface Post  {
    postreactionid: string;
    userid: string;
    postid: string;
    reaction: string;
    created_at: Date;
}


export class PostReactionRepository {
    createReaction = async (userid: string, postid: string, reaction: string): Promise<Post> => {
        const postreactionid = uuidv4()
        const text = `INSERT INTO post_reactions(postreactionid, userid, postid, reaction) VALUES($1,$2,$3,$4) RETURNING *`
        const values = [postreactionid, userid, postid, reaction]
        const query = await pool.query(text, values)
        return query.rows[0]
    }

    updateReaction = async (postreactionid: string, reaction: string) => {
        const text = `UPDATE post_reactions SET reaction=$1 WHERE postreactionid=$2 RETURNING *`
        const values = [reaction, postreactionid]

        const query = await pool.query(text, values)
        return query.rows[0]
    }

    deleteReaction = async (postreactionid: string): Promise<Post> => {
        const text = `DELETE FROM post_reactions WHERE postreactionid=$1`
        const value = [postreactionid]
        const query = await pool.query(text, value)
        return query.rows[0]
    }
}