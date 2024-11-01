import { CommentRepository } from "../database/repository/comment-repository"
import { processingMedias } from "../utils"
import { Media } from "../utils"


export class CommentService {
    commentRepository: any

    constructor() {
        this.commentRepository = new CommentRepository()
    }

    comment = async (userid: string, postid: string, content: string, media: Media[]) => {
        const processedMedias = await processingMedias(media)

        try {
            const newComment = await this.commentRepository.createComment(userid, postid, content, processedMedias)
            return newComment
        } catch(err) {
            return err
        }
    }

    deleteComment = async (commentid: string) => {
        try {
            const deletedComment = await this.commentRepository.deleteComment(commentid)
            return deletedComment
        } catch(err) {
            return err
        }
    }
}