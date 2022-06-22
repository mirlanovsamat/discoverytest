import getFolderSize from 'get-folder-size';

const date = new Date()

class Logger {
    startSaving(){
        return process.stdout.write(`Начало сохранение файла: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()} \n`)
    }

    endSaving(){
        return process.stdout.write(`Окончание сохранение файла: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()} \n`)
    }

    async checkFolderSize(folder){
        const size = await getFolderSize.loose(folder);
        if(size/1000000 > 10){
            return process.stdout.write(`Общий размер файлов в папке превысил лимит в 10 мегабайт`)
        }
    }
}

export default new Logger