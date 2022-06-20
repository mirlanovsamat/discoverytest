import fs from 'fs'
import getFolderSize from 'get-folder-size';

const date = new Date()


class Adapter {
    constructor(){}

    async writeFile(path, req){
        const writeStream = fs.createWriteStream(`${path}/${req.params['filename']}`)
        process.stdout.write(`Начало сохранение файла: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()} \n`)
        req.pipe(writeStream)
        process.stdout.write(`Окончание сохранение файла: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()} \n`)
        const size = await getFolderSize.loose(path);
        if(size/1000000 > 10){
            process.stdout.write(`Общий размер файлов в папке превысил лимит в 10 мегабайт`)
        }
    }

    readFile(path, res, file){
        const readStream = fs.createReadStream(path)
        res.writeHead(200, {
            "Content-Type" : file.mimetype,
            "Content-Length": file.size
        });
        readStream.on('data', (data) => {
            process.stdout.write('got')
        })
        readStream.pipe(res)
    }
}

export default new Adapter