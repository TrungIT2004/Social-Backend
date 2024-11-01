import { CommentService } from "../../services/comment-service"
import { Request, Response } from 'express'

const commentService = new CommentService()

export const comment = async (req: Request, res: Response) => {
    const { userid, postid, content } = req.body
    const media: any = req.files

    try {
        const uploadedComment = await commentService.comment(userid, postid, content, media)
        res.status(200).json(uploadedComment)
    } catch(err) {
        res.status(500).json(err)
    }
} 

export const deleteComment = async (req: Request, res: Response) => {
    const { commentid } = req.params
    const userid: any = req.headers['x-user-id']

    try {
        const deletedComment = await commentService.deleteComment(commentid)
        res.status(200).json(deletedComment)
    } catch(err) {
        res.status(500).json(err)
    }
}