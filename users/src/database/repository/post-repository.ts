import pool from "../connection"
import { v4 as uuidv4 } from 'uuid'

export interface Post {
    postid: string;
    userid: string;
    description: string;
    media: string[];
    created_at: Date;
}

export class PostRepository {
    selectPosts = async (): Promise<Post[]> => {
        const posts = await pool.query(`SELECT * FROM posts`)
        return posts.rows
    }

    selectOnePost = async (postid: string): Promise<Post> => {
        const text = `SELECT * FROM posts WHERE postid= $1`
        const value = [postid]
        const post = await pool.query(text,value)
        return post.rows[0]
    }

    createPost = async (userid: string, description: string, media: object[]): Promise<Post> => {
        const postid = uuidv4()
        const text = `INSERT INTO posts(postid, userid, description, media) VALUES($1, $2, $3, $4) RETURNING *`
        const values = [postid, userid, description, media]
        const post = await pool.query(text, values)
        return post.rows[0]
    }

    deletePost = async (postid: string): Promise<any> => {
        const text = `DELETE FROM posts WHERE postid=$1 RETURNING *`
        const value = [postid]
        return await pool.query(text, value)
    }
}