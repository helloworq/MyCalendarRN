import { MMKV } from 'react-native-mmkv'
import RNFS from 'react-native-fs'
import dayjs from "dayjs"
const PATH = RNFS.ExternalDirectoryPath + '/MHKV/'
const IMG_PATH = RNFS.ExternalDirectoryPath + '/IMG/'

const storage = new MMKV({
  id: `user-own-storage`,
  path: `${PATH}/storage`,
})

export function deleteMomentV2(ymd, time) {
  let allMoment = JSON.parse(storage.getString('moment'))
  const dateYM = dayjs(ymd).format('YYYY-MM')
  let target = allMoment[dateYM]

  for (let i = 0; i < target.length; i++) {
    const element = target[i]
    if (element != null && element['date'] === ymd && element['time'] === time) {
      delete allMoment[dateYM][i]
    }
  }
  storage.set('moment', JSON.stringify(allMoment))
}

export function getMarkedDatesV2() {
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
  return allKeys.map(e => allMoment[e]).flat().filter(e => e != null).map(e => e['date'])
}

export function loadMomentV2(ymd) {
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
  const today = target.filter(e => e != null).filter(e => e['date'] === ymd)
  return today
}

export function uploadMomentV2(text, imgs, tags) {
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