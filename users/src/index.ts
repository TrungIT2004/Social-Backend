import app from "./express-app"
import pool from "./database/connection"
import { env } from "./configs/config"
import router from "./api/routes/userRoutes"
import postRouter from "./api/routes/post-route"
import { authorizeToken } from "./api/middlewares"

const startServer = () => {
    pool.connect()
        .then( () => {
            console.log('Connected to PG')
            app.listen(env.PORT, () => {
                console.log('Server started at', env.PORT)
            })
        })
        .catch( (err) => {
            console.log(err)
        })
}

// Routes
app.use('/v1/users', router)

app.use(authorizeToken)
app.use('/v1/posts', postRouter)

startServer()


