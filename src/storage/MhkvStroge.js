import { MMKV } from 'react-native-mmkv'
import RNFS from 'react-native-fs'
import dayjs from "dayjs"
import isLeapYear from 'dayjs/plugin/isLeapYear'
const PATH = RNFS.ExternalDirectoryPath + '/MHKV/'
const IMG_PATH = RNFS.ExternalDirectoryPath + '/IMG/'

const storage = new MMKV({
  id: `user-own-storage`,
  path: `${PATH}/storage`,
})

export function statisticsByStroage(tag) {
  //目前还没加上年份的select组件，先只默认计算本年的指定tag统计数据
  const allMomentStr = storage.getString('moment')
  if (allMomentStr === null || allMomentStr === undefined || allMomentStr.length === 0) {
    //第一次使用app情况
    return []
  }
  const allMoment = JSON.parse(allMomentStr)
  const data = Object.values(allMoment).flat()

  return statistics(data, tag)
}

export function getTodayTagByStroage() {
  //今天的全部动态tag
  const allMomentStr = storage.getString('moment')
  if (allMomentStr === null || allMomentStr === undefined || allMomentStr.length === 0) {
    //第一次使用app情况
    return []
  }
  const allMoment = JSON.parse(allMomentStr)
  const curMonth = allMoment[dayjs().format('YYYY-MM')]

  if (allMomentStr != null || allMomentStr != undefined || allMomentStr.length != 0) {
    let curDayTag = {}
    curMonth?.filter(e => e != null)
      .filter((e) => dayjs().format('YYYY-MM-DD') === e['date'])
      .map((e) => e['tags'])
      .flat()
      .forEach(e => { curDayTag[e[0]] = e })
    return Object.values(curDayTag)
  }
  return []
}

function statistics(data, tag) {
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
  data = data.filter(e => e != null)

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

  //顺便返回今天的全部动态tag
  let curDayTag = {}
  data.filter((e) => cur.format('YYYY-MM-DD') === e['date'])
    .map((e) => e['tags'])
    .forEach((e) => e.forEach((e) => curDayTag[e[0]] = e))

  //组装数据返回
  let newRes = {}
  newRes['res'] = res
  newRes['curDayTag'] = curDayTag

  return newRes
}

export function getTagsByStroage() {
  const tags = storage.getString('tags')
  if (tags != null && tags != undefined) {
    return JSON.parse(tags)
  }
  return []
}

export function setTagsByStroage(data) {
  storage.set('tags', JSON.stringify(data))
}

export function deleteMoment(ymd, time) {
  let allMoment = JSON.parse(storage.getString('moment'))
  const dateYM = dayjs(ymd).format('YYYY-MM')
  let target = allMoment[dateYM]

  for (let i = 0; i < target.length; i++) {
    const element = target[i]
    if (element != null && element['date'] === ymd && element['time'] === time) {
      allMoment[dateYM].splice(i, 1)
    }
  }
  storage.set('moment', JSON.stringify(allMoment))
}

export function getMarkedDatesByStroage(tag) {
  //获取全部的标记日期，后期考虑性能可以通过按月加载
  // {
  //     '2023-06-01': { selected: true, marked: true, selectedColor: 'green' },
  //     '2023-06-02': { marked: true },
  //     '2023-06-03': { selected: true, marked: true, selectedColor: 'green' }
  // }
  const allMomentStr = storage.getString('moment')

  if (allMomentStr === null || allMomentStr === undefined || allMomentStr.length === 0) {
    //第一次使用app情况
    return []
  }
  const allMoment = JSON.parse(allMomentStr)
  const allKeys = Object.keys(allMoment)

  return allKeys.map(e => allMoment[e])
    .flat()
    .filter(e => e != null)
    .filter(e => {
      if (tag && '#全部标签' != tag) {
        const match = e['tags']?.filter(ele => ele[0] === tag)
        if (match === null || match === undefined || match.length === 0) {
          return false
        }
      }
      return true
    })
    .map(e => e['date'])
}

export function loadMomentByStroage(ymd, tag) {
  //获取指定天的全部动态
  // [
  //   {
  //     "date": "2023-08-01",
  //     "description": "   ",
  //     "imageUrl": [
  //       "file:///storage/emulated/0/Android/data/com.mycalendar/files/MyData/2023/2023-08-01/16-45-23/IMG_20230621_014637_1.jpg"
  //     ],
  //     "tags": [],
  //     "title": "16-45-23"
  //   }
  // ]
  const allMomentStr = storage.getString('moment')
  if (allMomentStr === null || allMomentStr === undefined || allMomentStr.length === 0) {
    //第一次使用app情况
    return []
  }

  const allMoment = JSON.parse(allMomentStr)
  const dateYM = dayjs(ymd).format('YYYY-MM')
  const target = allMoment[dateYM]
  const today = target?.filter(e => e != null)
    .filter(e => e['date'] === ymd)
    .filter(e => {
      if (tag != null && tag != undefined && tag != '' && tag != '#全部标签') {
        //console.log(tag,e['tags'],e['tags'].some(ele => ele[0] === tag))
        if (e['tags'].some(ele => ele[0] === tag)) {
          return true 
        }
        return false
      }
      return true
    })
  return today
}

export function uploadMomentByStroage(text, imgs, tags) {
  //实例存储格式
  // {
  //   "2023-08": [
  //     {
  //       "date": "2023-08-01",
  //       "time": "15:33:33",
  //       "datetime": "2023-08-01 15:33:33",
  //       "tags": [],
  //       "text": "a",
  //       "imgs": []
  //     }
  //   ],
  //     "2023-09": []
  // }
  //storage.delete('moment')
  if (text === '' || text === null || text === undefined) {
    text = '   '
  }
  const now = dayjs()
  const dateYM = now.format('YYYY-MM')
  const datetime = now.format('YYYY-MM-DD HH:mm:ss')
  const date = now.format('YYYY-MM-DD')
  const time = now.format('HH:mm:ss')

  const obj = {}
  const moment = {}
  moment['date'] = date
  moment['time'] = time
  moment['datetime'] = datetime
  moment['tags'] = tags
  moment['description'] = text
  moment['imageUrl'] = imgs.map(e => e['path'])
  obj[dateYM] = [moment]

  //判断是不是第一次使用app,再看当前日期是否存过
  //storage.delete('moment')
  let allMoment = storage.getString('moment')

  if (allMoment === null || allMoment === undefined || allMoment.length === 0) {
    //第一次使用app情况
    storage.set('moment', JSON.stringify(obj))
  } else {
    let saved = JSON.parse(allMoment)
    let target = saved[dateYM]
    //判断由于当前月份数据已经存过
    if (target === null || target === undefined) {
      //有数据，但是当前月没数据
      saved[dateYM] = moment
      storage.set('moment', JSON.stringify(saved))
    } else {
      //有数据，当前月也有数据
      target.push(moment)
      storage.set('moment', JSON.stringify(saved))
    }
  }
}

export default storage