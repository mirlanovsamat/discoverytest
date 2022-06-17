import { Router } from "express";
import fs from 'fs'
import { ensureDir } from 'fs-extra'
import path from 'app-root-path'
import UploadService from "./service.js"; 

const router = new Router()
const uploadFolder = `${path}/uploads`

router.post('/files/:filename', async (req, res) => {
    await ensureDir(uploadFolder)
    await UploadService.create(req.params['filename'], req.header('content-type'), req.header('content-length'))
    const file = fs.createWriteStream(`${uploadFolder}/${req.params['filename']}`)
    req.pipe(file)
    res.json('File uploaded')
})

router.get('/files/:filename', async (req, res) => {
    const file = await UploadService.getFile(req.params['filename'])
    const readStream = await fs.createReadStream(`${uploadFolder}/${req.params['filename']}`)
    res.writeHead(200, {
        "Content-Type" : file.mimetype,
        "Content-Length": file.size
    });
    readStream.pipe(res)

}) 

router.put('/files/:filename', async (req, res) => {
    await ensureDir(uploadFolder)
    await UploadService.updateFile(req.params['filename'], req.header('content-type'), req.header('content-length'))
    const file = fs.createWriteStream(`${uploadFolder}/${req.params['filename']}`)
    req.pipe(file)
    res.json('File updated')
})

export default router;