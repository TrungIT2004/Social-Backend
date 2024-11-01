import { Request, Response } from 'express'
import { PostService } from '../../services/post-service'
import { Media } from '../../utils'
import { UserService } from '../../services/user-services'

const postService = new PostService()


export const uploadPost = async (req: Request, res: Response) => {
    const { userid, description } = req.body
    console.log(req.body)
    const media = req.files 
    console.log(media)

    try {
        const newPost = await postService.uploadPost(userid, description, media)
        res.status(200).json(newPost)
    } catch(err) {
        res.status(500).json(err)
    }
}

export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await postService.getPosts()
        res.status(200).json(posts)
    } catch(err) {
        res.status(500).json(err)
    }
}

export const getPostById = async (req: Request, res: Response) => {
    const { postid }: any = req.params
    console.log(postid)
    
    try {
        const post = await postService.getPostById(postid)
        res.status(200).json(post)
    } catch(err) {
        res.status(500).json(err)
    }
}

export const deletePost = async (req: Request, res: Response) => {
    const { postid }: any = req.params
    console.log(req.body.userid)

    try {
        await postService.deletePost(postid, req.body.userid)
        res.status(200).json({"msg": "post deleted"})
    } catch(err) {
        res.status(500).json(err)
    }
} 