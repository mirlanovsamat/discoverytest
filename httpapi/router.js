import { Router } from "express";
import UploadService from "./service.js"; 
import http from 'http'
import fs from 'fs'


const router = new Router()

const fileUpload = (req, res, next) => {
    const {filename} = req.params
    let buffer = new Buffer('')
    req.on('data', (chunk) => {
        buffer = Buffer.concat([buffer, chunk])
    })
    req.on('end', () => {
        req.file = {
            buffer,
            filename,
            mimetype: req.header('content-type'),
            size: req.header('content-length')
        }
        next()
    })
}

router.post('/files/:filename', fileUpload, async (req, res) => {
    await UploadService.create(req.file)
    res.json('File upload')
})

router.get('/files/:filename', async (req, res) => {
    const {file, readStream} = await UploadService.getFile(req.params.filename)
    res.writeHead(200, {
        "Content-Type" : file.mimetype,
        "Content-Length": file.size
    });
    readStream.pipe(res)
}) 

router.put('/files/:filename', fileUpload, async (req, res) => {
    await UploadService.updateFile(req.file)
    res.json('File updated') 
})

export default router;