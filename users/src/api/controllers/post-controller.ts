import { Request, Response } from 'express'
import { PostService } from '../../services/post-service'
import { Media } from '../../utils'

const postService = new PostService()


export const uploadPost = async (req: Request, res: Response) => {
    const { userid, description } = req.body
    const media = req.files 

    try {
        const newPost = await postService.uploadPost(userid, description, media)
        res.status(200).json(newPost)
    } catch(err) {
        res.status(500).json(err)
    }
}