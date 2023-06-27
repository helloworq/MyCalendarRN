import RNFS, { readFile, unlink } from 'react-native-fs'

const folder = '/MyData/'
const path = RNFS.ExternalDirectoryPath + folder
const dataName = '/data.json'
const tagsPath = RNFS.ExternalDirectoryPath + '/Extra/tags.txt'
const filePrefix = 'file://'

export function uploadMoment(text, imgs) {
    const saved = mkdir()

    text = generateMoment(saved, text)
    RNFS.writeFile(saved + dataName, text)

    imgs.forEach(element => {
        RNFS.copyFile(element.path,
            filePrefix + saved + element.path.slice(element.path.lastIndexOf('/')))
    });
}

export function split2Colon(t) { return t.replaceAll('-', ':') }
export function colon2Split(t) { return t.replaceAll(':', '-') }

function generateMoment(path, text) {
    let positionFirst = path.lastIndexOf('/') + 1
    let time = path.slice(positionFirst)
    time = time.replaceAll('-', ':')

    path = path.slice(0, positionFirst - 1)

    let date = path.slice(path.lastIndexOf('/') + 1)
    let obj = {}
    obj['time'] = time
    obj['date'] = date
    obj['datetime'] = date + ' ' + time
    obj['moment'] = text
    return JSON.stringify(obj)
}

export function removeData(ymd, time) {
    dataPath = path + ymd + '/' + time
    RNFS.exists(dataPath).then((exist) => {
        console.log('exist => ', exist, dataPath)
        if (exist) {
            RNFS.readDir(dataPath).then(dir => {
                dir.forEach(ele => {
                    console.log("delete => ", ele.path)
                    RNFS.unlink(ele.path)
                })
            }).then(() => RNFS.unlink(dataPath))
        }
    })

}

export function loadFolder() {
    //加载自定义目录下的数据，供热力图使用，查看年内每天的数据量
    return RNFS.readDir(path)
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
                                    temp['dataPath'] = timeEle.path
                                }
                                temp['time'] = split2Colon(ymdEle.name)
                                temp['date'] = ymd
                                temp['timeSplit'] = ymdEle.name
                                temp['title'] = ymdEle.name
                                if (timeEle.path.indexOf(dataName) === -1) {
                                    imgs.push(filePrefix + timeEle.path)
                                }
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

function getNow() {
    const date = new Date()
    // 目标时区，东8区
    const targetTimezone = 0;
    // 当前时区与中时区时差，以min为维度
    const dif = date.getTimezoneOffset();
    // 本地时区时间 + 本地时区时差  = 中时区时间
    // 目标时区时间 + 目标时区时差 = 中时区时间
    // 目标时区时间 = 本地时区时间 + 本地时区时差 - 目标时区时差
    // 东8区时间
    const east9time = date.getTime() + dif * 60 * 1000 - (targetTimezone * 60 * 60 * 1000);
    return new Date(east9time);
}


function getCurrentYMD() {
    const d = getNow();
    return d.getFullYear() + "-"
        + (d.getMonth() + 1).toString().padStart(2, '0') + "-"
        + (d.getDate()).toString().padStart(2, '0')
}

function getCurrentTime() {
    const d = getNow();
    return (d.getHours() + 8).toString().padStart(2, '0') + "-"
        + (d.getMinutes()).toString().padStart(2, '0') + "-"
        + (d.getSeconds()).toString().padStart(2, '0')
}


//-----------
export function writeTags(Tag) {

    // Tag = {
    //     1: ['#上班打卡', 'alarm-check', false],
    //     2: ['#下班打卡', 'alarm-off', false],
    //     3: ['#拉屎打卡', 'emoticon-poop', false],
    //     4: ['#按时吃饭打卡', 'food-variant', false],
    //     5: ['#力量训练打卡', 'arm-flex-outline', false],
    //     6: ['#跑步打卡', 'run-fast', true],
    // }

    return RNFS.writeFile(tagsPath, JSON.stringify(Tag))
}

export function writeTags4Me() {
    Tag = {
        1: ['#上班打卡', 'alarm-check', false],
        2: ['#下班打卡', 'alarm-off', false],
        3: ['#拉屎打卡', 'emoticon-poop', false],
        4: ['#按时吃饭打卡', 'food-variant', false],
        5: ['#力量训练打卡', 'arm-flex-outline', false],
        6: ['#跑步打卡', 'run-fast', true],
    }

    return RNFS.writeFile(tagsPath, JSON.stringify(Tag))
}

export function loadTags() {
    return RNFS.readFile(tagsPath)
}