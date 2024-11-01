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
        const text = `select posts.postid, posts.userid, posts.description, posts.media, posts.created_at, post_reactions.count as reaction_count, comments.count as comment_count, comments from posts
                    join (select count(reaction), postid from post_reactions group by postid) as post_reactions on posts.postid = post_reactions.postid
                    join (select postid, count(content), json_agg(
	                    json_build_object(
		                    'content', comments.content,
		                    'created_at', comments.created_at
	                    )
                    ) as comments
                    from comments
                    group by comments.postid) as comments on posts.postid = comments.postid`

        const posts = await pool.query(text)
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