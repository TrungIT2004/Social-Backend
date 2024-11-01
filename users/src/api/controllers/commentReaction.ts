import { CommentReactionRepository } from "../../database/repository/commentReaction"
import { Request, Response } from "express"

const commentReactionService = new CommentReactionRepository()

export const react = async (req: Request, res: Response) => {
    const { userid, postid, commentid, reaction } = req.body

    try {
        const newReaction = await commentReactionService.createReaction(userid, postid, commentid, reaction)
        res.status(200).json(newReaction)
    } catch(err) {
        res.status(500).json(err)
    }
}

export const changeReaction = async (req: Request, res: Response) => {
    const { commentreactionid } = req.params
    const { reaction } = req.body

    try {
        const updatedReaction = await commentReactionService.updateReact(commentreactionid, reaction)
        console.log(updatedReaction)
        res.status(200).json(updatedReaction)
    } catch(err) {
        res.status(500).json(err)
    }
}

export const deleteReaction = async (req: Request, res: Response) => {
    const { commentreactionid } = req.params

    try {
        const deletedReaction = await commentReactionService.deleteReaction(commentreactionid)
        res.status(200).json('Deleted')
    } catch(err) {
        res.status(500).json(err)
    }
}