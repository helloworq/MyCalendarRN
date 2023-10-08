import { getDBConnection } from '../RNSqlite'
import stroge from '../MhkvStroge'
import dayjs from 'dayjs'
import DeviceInfo from 'react-native-device-info';

const db = getDBConnection()
const table = 'moment'
const moment = {
    id: 'id',
    userId: 'user_id',
    content: 'content',
    images: 'images',
    tags: 'tags',
    device: 'device',
    edited: 'edited',
    createTime: 'create_time',
    lastUpdateTime: 'last_update_time',
}

export function saveMoment(text, imgs, tags) {
    const now = dayjs()
    const datetime = now.format('YYYY-MM-DD HH:mm:ss')
    if (text === '' || text === null || text === undefined) {
        text = '   '
    }
    const imageUrl = imgs.map(e => e['path'])
    const id = stroge.getNumber('id')

    db.transaction(function (txn) {
        txn.executeSql(`insert into moment(user_id,content,images,tags,edited,device,create_time,last_update_time) `
            + `values(:id,:content,:images,:tags,:edited,:device,:create_time,:last_update_time)`,
            [id, text, JSON.stringify(imageUrl), JSON.stringify(tags), 0, DeviceInfo.getDeviceNameSync(), datetime, datetime], (tx, res) => {
                console.log('影响行=> ', res.rowsAffected)
            })
    }, (e) => console.log(e), (e) => console.log(e))
}

export function updateMoment(user) {
    db.transaction(function (txn) {
        txn.executeSql(`update user set name=:name,age=:age,address=:address,password=:password,role_id=:roleId `,
            [user.name, user.age, user.address, user.password, user.roleId], function (tx, res) {
                console.log('影响行=> ', res.rowsAffected)
            })
    }, (e) => console.log(e), (e) => console.log(e))
}

export function selectAllMomentDates(callback) {
    db.transaction(function (txn) {
        txn.executeSql(`SELECT CREATE_TIME FROM ${table} `, [], function (tx, res) {
            let response = {}
            const value = { selected: true, marked: true, selectedColor: '#66ff66' }
            const content = res.rows['_array']
                .map(e => e['CREATE_TIME'])
                .filter(e => e != null)
                .map(e => dayjs(e).format('YYYY-MM-DD'))
            content.forEach(e => response[e] = value)
            callback(response)
        })
    })
}

export function selectAllMomentByTag(tag, callback) {
    db.transaction(function (txn) {
        txn.executeSql(`SELECT CREATE_TIME,INSTR(TAGS,:str) AS exist FROM ${table} WHERE exist <> 0`, [tag], function (tx, res) {

            let response = {}
            const value = { selected: true, marked: true, selectedColor: '#66ff66' }
            const content = res.rows['_array']
                .map(e => e['CREATE_TIME'])
                .filter(e => e != null)
                .map(e => dayjs(e).format('YYYY-MM-DD'))
            content.forEach(e => response[e] = value)
            callback(response)
        })
    }, (e) => console.log(e), (e) => console.log(e))
}

export function selectCurMomentInfo(time, callback) {
    db.transaction(function (txn) {
        txn.executeSql(`SELECT *,TIME(CREATE_TIME) AS time FROM ${table} where DATE(CREATE_TIME) = :time `, [time], function (tx, res) {
            callback(res.rows['_array'])
        })
    }, (e) => console.log(e), (e) => console.log(e))
}

export function deleteMomentInfo(id) {
    db.transaction(function (txn) {
        txn.executeSql(`DELETE FROM ${table} where ID = :id `, [id], function (tx, res) {
            console.log('影响行=> ', res.rowsAffected)
        })
    }, (e) => console.log(e), (e) => console.log(e))
}