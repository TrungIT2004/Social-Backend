import express from 'express'
import { upload } from '../../configs/multer'
import { uploadPost } from '../controllers/post-controller'

const postRouter = express.Router()

// Routes
postRouter.post('/', upload.array('media', 20), uploadPost)

export default postRouter