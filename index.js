import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './httpapi/router.js'

const app = express()
dotenv.config()
const port = process.env.PORT || 5000

app.use(express.json()) 
app.use('/', router)


async function startApp() {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(port, () => {console.log(`Server is started on port ${port}!`)})
    } catch(e) {
        console.log(e)
    }
}

startApp()