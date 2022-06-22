import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './httpapi/router.js'
import { ensureDir } from 'fs-extra'
import path from 'app-root-path'

const app = express()
dotenv.config()
const port = process.env.PORT || 5000
const uploadFolder = `${path}/${process.env.UPLOAD_FOLDER}`;
ensureDir(uploadFolder);

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