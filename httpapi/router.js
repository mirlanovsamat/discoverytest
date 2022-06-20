import { Router } from "express";
import UploadService from "./service.js"; 
import Adapter from "../adapter/adapter.js";

const router = new Router()

router.post('/files/:filename', async (req, res) => {
    await UploadService.create(req.params['filename'], req.header('content-type'), req.header('content-length'))
    await Adapter.writeFile(`uploads/${req.params['filename']}`, req)
    res.json('File uploaded')
})

router.get('/files/:filename', async (req, res) => {
    const file = await UploadService.getFile(req.params['filename'])
    await Adapter.readFile(`uploads/${req.params['filename']}`, res, file)
}) 

router.put('/files/:filename', async (req, res) => {
    await UploadService.updateFile(req.params['filename'], req.header('content-type'), req.header('content-length'))
    await Adapter.writeFile(`uploads`, req)
    res.json('File updated')
})

export default router;