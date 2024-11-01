import express from 'express'
import { upload } from '../../configs/multer'
import { comment, deleteComment } from '../controllers/comment-controller'

const commentRouter = express.Router()

commentRouter.post('/', upload.array('media', 20), comment)
commentRouter.delete('/:commentid', deleteComment)

export default commentRouter