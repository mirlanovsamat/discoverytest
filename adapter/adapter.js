import fs from 'fs'
import logger from "../adapter/logger.js";

class Adapter {
    constructor(){}

    async writeFile(filename, buffer){
        return new Promise((resolve, reject) => {
            logger.startSaving()
            const writeStream = fs.createWriteStream(`${process.env.UPLOAD_FOLDER}/${filename}`)
            writeStream.write(buffer)
            writeStream.on("error", err => reject(err));
            writeStream.on("end", () => console.log('end'));
            logger.endSaving()
            logger.checkFolderSize(process.env.UPLOAD_FOLDER)
            resolve(filename)
        }).then(data => {console.log(data)});
    }

    readFile(filename){
        const readStream = fs.createReadStream(`${process.env.UPLOAD_FOLDER}/${filename}`);
        readStream.on("error", err => reject(err));
        readStream.on("end", () => console.log('end'));
        return readStream
    }
}

export default new Adapter