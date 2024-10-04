import express from 'express'
import { refresh, signIn, signOut, signUp } from '../controllers/userControllers'
import { authorizeToken } from '../middlewares'
const router = express.Router()


router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/refresh', refresh)
router.post('/signout', signOut)

// Access data
router.get('/data', authorizeToken, (req, res) => {
    res.status(200).json({"msg": "Successfully getting the data"})
})

router.get('/test', (req, res) => {
    const data = true
    if (data) res.status(200).json({"msg": "data"})
    res.status(400).json({"msg": "no"})
})

export default router