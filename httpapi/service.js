import Upload from "../db/upload.js"
import Adapter from "../adapter/adapter.js";

class UploadService {
    async create({buffer, filename, mimetype, size}) {
        await Upload.create({ name: filename, mimetype, size })
        return await Adapter.writeFile(filename, buffer) 
    }

    async getFile(filename) {
        const file = await Upload.findOne({name: filename})
        const readStream =  await Adapter.readFile(filename)
        return {file, readStream}
    }   
    
    async updateFile({buffer, filename, mimetype, size}) {
        const body = { name: filename, mimetype, size } 
        const file = await Upload.findOneAndUpdate({name: filename}, body)
        if(!file) {
            await Upload.create(body) 
        }
        await Adapter.writeFile(filename, buffer)
    }
}

export default new UploadService(); 