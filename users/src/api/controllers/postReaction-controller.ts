import { PostReactionRepository } from "../../database/repository/postReaction-repository"
import { Request, Response } from 'express'


const postReaction = new PostReactionRepository()

export const react = async (req: Request, res: Response) => {
    const { userid, postid, reaction } = req.body

    try {
        const newReact = await postReaction.createReaction(userid, postid, reaction)
        res.status(200).json(newReact)
    } catch(err) {
        res.status(500).json(err)
    }
}

export const changeReaction = async (req: Request, res: Response) => {
    const { postreactionid } = req.params
    const { reaction } = req.body

    console.log(postreactionid, reaction)

    try {
        const updatedReaction = await postReaction.updateReaction(postreactionid, reaction)
        res.status(200).json(updatedReaction)
    } catch(err) {
        res.status(500).json(err)
    }
}

export const undoReact = async (req: Request, res: Response) => {
    const { postreactionid } = req.params

    try {
        const undo = await postReaction.deleteReaction(postreactionid)
        res.status(200).json(undo)
    } catch(err) {
        res.status(500).json(err)
    }
}