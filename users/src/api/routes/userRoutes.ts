import express from 'express'
import { refresh, sendFriendRequest, signIn, signOut, signUp } from '../controllers/userControllers'
import { authorizeToken } from '../middlewares'
const router = express.Router()


router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/refresh', refresh)
router.post('/signout', signOut)
router.post('/friend-request', authorizeToken, sendFriendRequest)

export default router