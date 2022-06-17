import Upload from "../db/upload.js"

class UploadService {
    async create(name, mimetype, size) {
        const body = { name, mimetype, size }
        return await Upload.create(body) 
    }

    async getFile(name) {
        const file = await Upload.findOne({name: name})
        return file
    } 
    
    async updateFile(name, mimetype, size) {
        const body = { name, mimetype, size }
        const file = await Upload.findOneAndUpdate({name: name}, body)
        if(!file) {
            return await Upload.create(body) 
        }
        return file
    }
}

export default new UploadService(); 