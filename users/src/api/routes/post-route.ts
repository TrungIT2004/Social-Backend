import express from 'express'
import { upload } from '../../configs/multer'
import { deletePost, getPostById, getPosts, uploadPost } from '../controllers/post-controller'

const postRouter = express.Router()

// Routes
postRouter.get('/', getPosts)
postRouter.get('/:postid', getPostById)
postRouter.post('/', upload.array('media', 20), uploadPost)
postRouter.delete('/:postid', deletePost)


export default postRouter