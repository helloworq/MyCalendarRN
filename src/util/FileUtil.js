import RNFS from 'react-native-fs'
import { TurboModuleRegistry } from 'react-native/types'

var folder = '/MyData'
var path = RNFS.DocumentDirectoryPath + folder

export function readText(fileRelativePath) {
    RNFS.readFile(path + '/' + fileRelativePath)
        .then((success) => { console.log('读取内容=>', success) })
        .catch((err => { console.log(err.message) }))
}

export function writeText(fileRelativePath, text) {
    RNFS.writeFile(path + '/' + fileRelativePath, text)
        .then((success) => { console.log('已写入\n') })
        .catch((err => { console.log(err.message) }))
}

export function appendText(fileRelativePath, text) {
    RNFS.appendFile(path + '/' + fileRelativePath, text)
        .then((success) => { console.log('已追加写入\n') })
        .catch((err => { console.log(err.message) }))
}

export function readDirs(path) {
    RNFS.readdir(path).then((r) => console.log(r))
}