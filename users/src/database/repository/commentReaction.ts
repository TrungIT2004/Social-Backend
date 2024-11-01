import { comment } from "../../api/controllers/comment-controller";
import pool from "../connection"
import { v4 as uuidv4 } from "uuid" 

export interface CommentReaction {
    commentreactionid: string;
    userid: string;
    postid: string;
    commentid: string;
    reaction: string;
    created_at: Date;
}


export class CommentReactionRepository {
    createReaction = async (userid: string, postid: string, commentid: string, reaction: string): Promise<CommentReaction> => {
        const commentreactionid = uuidv4()
        const text = `INSERT INTO comment_reactions(commentreactionid, userid, postid, commentid, reaction) VALUES($1,$2,$3,$4,$5) RETURNING *`
        const values = [commentreactionid, userid, postid, commentid, reaction]

        const query = await pool.query(text, values)
        return query.rows[0]
    }

    updateReact = async (commentreactionid: string, reaction: string) => {
        const text = `UPDATE comment_reactions SET reaction=$1 WHERE commentreactionid=$2 RETURNING *`
        const values = [reaction, commentreactionid]

        const query = await pool.query(text, values)
        return query.rows[0]
    }

    deleteReaction = async (commentreactionid: string) => {
        const text = `DELETE FROM comment_reactions WHERE commentreactionid=$1`
        const value = [commentreactionid]

        const query = await pool.query(text,value)
        return query.rows[0]
    }
}