import app from "./express-app"
import pool from "./database/connection"
import { env } from "./configs/config"

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

startServer()