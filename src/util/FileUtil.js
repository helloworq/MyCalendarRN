import RNFS, { readFile } from 'react-native-fs'

const folder = '/MyData/'
const path = RNFS.ExternalDirectoryPath + folder
const dataName = '/data.json'
const filePrefix = 'file://'

export function uploadMoment(text, imgs) {
    const saved = mkdir()

    RNFS.writeFile(saved + dataName, text)

    imgs.forEach(element => {
        RNFS.copyFile(element.path,
            filePrefix + saved + element.path.slice(element.path.lastIndexOf('/')))
    });

}

export function loadData(ymd) {
    let res = []
    let dirs = []
    let pL = []

    return RNFS.readDir(path + ymd)
        .then((ymdR) => {
            ymdR.forEach(ymdEle => {
                if (ymdEle.isDirectory()) {
                    dirs.push(ymdEle)
                }
            })
            return dirs
        })
        .then((dirs) => {
            dirs.forEach(ymdEle => {
                let p =
                    RNFS.readDir(path + ymd + '/' + ymdEle.name)
                        .then((timeR) => {
                            let temp = {}
                            let imgs = []
                            timeR.forEach(timeEle => {
                                if ('/' + timeEle.name === dataName) {
                                    // RNFS.readFile(timeEle.path).then((t) => function () {
                                    //     console.log(111111)
                                    //     temp['description'] = t
                                    // })
                                    temp['description'] = timeEle.path
                                }
                                temp['time'] = ymdEle.name
                                temp['title'] = ymdEle.name
                                imgs.push(filePrefix + timeEle.path)
                            })

                            temp['imageUrl'] = imgs
                            res.push(temp)
                            return temp
                        })
                pL.push(p)
            })
        })
        .then((r) => Promise.all(pL))
}

function mkdir() {
    const folderYMD = getCurrentYMD()
    const folderTime = getCurrentTime()

    RNFS.mkdir(path + folderYMD)
    RNFS.mkdir(path + folderYMD + '/' + folderTime)
    return path + folderYMD + '/' + folderTime;
}

function getCurrentYMD() {
    const d = new Date();
    return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay()
}

function getCurrentTime() {
    const d = new Date();
    return d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds()
}

export function readText(fileRelativePath) {
    let res
    let r = Promise.all(RNFS.readFile(fileRelativePath)).then((r)=>res=r)
    console.log(res)
    console.log(JSON.stringify(res))
    return JSON.stringify(r);
}

function readTextV2(fileRelativePath) {
    RNFS.readFile(fileRelativePath)
        .then((success) => { console.log('读取内容=>', success) })
        .catch((err => { console.log(err.message) }))
}

function writeText(fileRelativePath, text) {
    RNFS.writeFile(path + '/' + fileRelativePath, text)
        .then((success) => { console.log('已写入\n') })
        .catch((err => { console.log(err.message) }))
}

function appendText(fileRelativePath, text) {
    RNFS.appendFile(path + '/' + fileRelativePath, text)
        .then((success) => { console.log('已追加写入\n') })
        .catch((err => { console.log(err.message) }))
}

function readDirs(path) {
    RNFS.readdir(path).then((r) => console.log(r))
}