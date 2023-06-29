import RNFS from 'react-native-fs'
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear'


const folder = '/MyData/'
const path = RNFS.ExternalDirectoryPath + folder
const dataName = '/data.json'
const tagsPath = RNFS.ExternalDirectoryPath + '/Extra/tags.txt'
const filePrefix = 'file://'

export function uploadMoment(text, imgs, tags) {
    const saved = mkdir()

    text = generateMoment(saved, text, tags)
    RNFS.writeFile(saved + dataName, text)

    imgs.forEach(element => {
        RNFS.copyFile(element.path,
            filePrefix + saved + element.path.slice(element.path.lastIndexOf('/')))
    })
}

export function split2Colon(t) { return t.replaceAll('-', ':') }
export function colon2Split(t) { return t.replaceAll(':', '-') }
function getYearFromYMD(ymd) { return ymd.split('-')[0] }

function generateMoment(path, text, tags) {
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
    obj['tags'] = tags
    return JSON.stringify(obj)
}

export function removeData(ymd, time) {
    dataPath = path + getYearFromYMD(ymd) + '/' + ymd + '/' + time
    RNFS.exists(dataPath).then((exist) => {
        if (exist) {
            RNFS.readDir(dataPath).then(dir => {
                dir.forEach(ele => {
                    //console.log("delete => ", ele.path)
                    RNFS.unlink(ele.path)
                })
            }).then(() => RNFS.unlink(dataPath))
        }
    })
}

export function loadFolder() {
    //加载自定义目录下的数据，供热力图使用，查看年内每天的数据量
    return RNFS.readDir(path + new Date().getFullYear())
}

export function loadData(ymd) {
    let res = []
    let dirs = []
    let pL = []
    const ymdV2 = ymd

    ymd = getYearFromYMD(ymd) + '/' + ymd
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
                                temp['date'] = ymdV2
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
    const currentYear = new Date().getFullYear()
    const folderYMD = getCurrentYMD()
    const folderTime = getCurrentTime()

    RNFS.mkdir(path + currentYear)
    RNFS.mkdir(path + currentYear + '/' + folderYMD)
    RNFS.mkdir(path + currentYear + '/' + folderYMD + '/' + folderTime)
    return path + currentYear + '/' + folderYMD + '/' + folderTime;
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

export function momentTagStatistics(year, tag) {
    //统计动态中的tag信息,按年统计，如果后续数据量过大影响加载性能，考虑使用一个文本单独记录统计信息

    RNFS.readDir(path + year)
        .then((r) => {
            let temp = []
            r.forEach((e) => { temp.push(e.path) })
            return temp
        }).then((r) => {
            let pL = []
            r.forEach((e) => {
                let p = RNFS.readDir(e)
                pL.push(p)
            })
            return pL
        }).then((r) => {
            Promise.all(r).then((r) => {
                let pL = []
                r = getPathFromArray(r)
                r.forEach((e) => {
                    let p = RNFS.readFile(e + '/data.json')
                    pL.push(p)
                })
                return pL
            }).then((r) =>
                Promise.all(r).then((r) => {
                    statistics(r, tag)
                }))
        })
}

export function getPathFromArray(array) {
    let res = []
    array.forEach(e => {
        e.forEach((e) => res.push(e.path))
    })
    return res
}

export function loadYearFolder(year) {
    return RNFS.readDir(path + year)
}

export function statistics(data, tag) {
    //全部  本年  本月  本周  今日
    //示例入参
    // [
    //     "{\"time\":\"15:56:07\",\"date\":\"2023-06-28\",\"datetime\":\"2023-06-28 15:56:07\",\"moment\":\"1111\",\"tags\":[[\"#上班打卡\",\"alarm-check\",true]]}",
    //     "{\"time\":\"10:36:56\",\"date\":\"2023-06-29\",\"datetime\":\"2023-06-29 10:36:56\",\"moment\":\"qqqq\",\"tags\":[[\"#上班打卡\",\"alarm-check\",true],[\"#下班打卡\",\"alarm-off\",true],[\"#按时吃饭打卡\",\"food-variant\",true]]}",
    //     "{\"time\":\"10:36:59\",\"date\":\"2023-06-29\",\"datetime\":\"2023-06-29 10:36:59\",\"moment\":\"qqqq\",\"tags\":[[\"#上班打卡\",\"alarm-check\",true],[\"#下班打卡\",\"alarm-off\",true],[\"#按时吃饭打卡\",\"food-variant\",true]]}",
    //     "{\"time\":\"10:37:04\",\"date\":\"2023-06-29\",\"datetime\":\"2023-06-29 10:37:04\",\"moment\":\"qqqq\",\"tags\":[[\"#上班打卡\",\"alarm-check\",true],[\"#下班打卡\",\"alarm-off\",true],[\"#按时吃饭打卡\",\"food-variant\",true]]}",
    //     "{\"time\":\"10:37:07\",\"date\":\"2023-06-29\",\"datetime\":\"2023-06-29 10:37:07\",\"moment\":\"qqqq\",\"tags\":[[\"#上班打卡\",\"alarm-check\",true],[\"#下班打卡\",\"alarm-off\",true],[\"#按时吃饭打卡\",\"food-variant\",true]]}",
    //     "{\"time\":\"10:37:10\",\"date\":\"2023-06-29\",\"datetime\":\"2023-06-29 10:37:10\",\"moment\":\"qqqq\",\"tags\":[[\"#上班打卡\",\"alarm-check\",true],[\"#下班打卡\",\"alarm-off\",true],[\"#按时吃饭打卡\",\"food-variant\",true]]}",
    //     "{\"time\":\"10:37:12\",\"date\":\"2023-06-29\",\"datetime\":\"2023-06-29 10:37:12\",\"moment\":\"qqqq\",\"tags\":[[\"#上班打卡\",\"alarm-check\",true],[\"#下班打卡\",\"alarm-off\",true],[\"#按时吃饭打卡\",\"food-variant\",true]]}"
    // ]

    //实例返回值
    // const data = {
    //     labels: ['今日', '本周', '本月', '本年', '全部'], // optional
    //     data: [0.3, 0.6, 0.8, 0.1, 0.2],
    //     colors: ['#4dff4d', 'blue', 'yellow', 'green', 'red']
    // };
    dayjs.extend(isLeapYear)
    const cur = dayjs()
    data = data.map(e => JSON.parse(e))

    //年
    let recordYear = {}
    //const yearRate = yearArray.filter((value, index) => yearArray.indexOf(value) === index).length / (isLeapYear ? 366 : 365)
    data.forEach((ele) => {
        const tags = ele['tags']
        tags.forEach((e) => e.forEach((e) => { if (e === tag) recordYear[ele['date']] = true }))
    })
    const yearRate = Object.keys(recordYear).length / (isLeapYear ? 366 : 365)
    //月
    let recordMonth = {}
    data.filter((e) => {
        return dayjs(e['date']).isAfter(cur.startOf('month'))
            && dayjs(e['date']).isBefore(cur.endOf('month'))
    }).forEach((ele) => {
        const tags = ele['tags']
        tags.forEach((e) => e.forEach((e) => { if (e === tag) recordMonth[ele['date']] = true }))
    })
    const monthRate = Object.keys(recordMonth).length / cur.daysInMonth()
    //周
    let recordWeek = {}
    data.filter((e) => {
        return dayjs(e['date']).isAfter(cur.startOf('week').add(1, 'day'))
            && dayjs(e['date']).isBefore(cur.endOf('week').add(1, 'day'))
    }).forEach((ele) => {
        const tags = ele['tags']
        tags.forEach((e) => e.forEach((e) => { if (e === tag) recordWeek[ele['date']] = true }))
    })
    const weekRate = Object.keys(recordWeek).length / 7
    //今天
    const today = Object.keys(recordWeek).indexOf(cur.format('YYYY-MM-DD')) != -1 ? 1 : 0

    const res = {
        labels: ['今日', '本周', '本月', '本年'], // optional
        data: [today, weekRate, monthRate, yearRate],
        colors: ['#4dff4d', 'blue', 'yellow', 'green']
    };
    return res
}