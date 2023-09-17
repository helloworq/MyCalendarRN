import { getDBConnection } from '../RNSqlite'
import stroge from '../MhkvStroge'

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

export function saveMoment(moment) {
    db.transaction(function (txn) {
        txn.executeSql(`insert into moment(user_id,content,images,tags,device,edited,create_time,last_update_time) `
            + `values(1,:content,:images,:tags,:device,:edited,:create_time,:last_update_time)`,
            [moment.userId, moment.images, moment.tags, moment.device, moment.edited, moment.create_time,
            moment.last_update_time], function (tx, res) {
                console.log('影响行=> ', res.rowsAffected)
            })
    })
}

export function updateMoment(user) {
    db.transaction(function (txn) {
        txn.executeSql(`update user set name=:name,age=:age,address=:address,password=:password,role_id=:roleId `,
            [user.name, user.age, user.address, user.password, user.roleId], function (tx, res) {
                console.log('影响行=> ', res.rowsAffected)
            })
    })
}

export function selectAllMoment() {
    db.transaction(function (txn) {
        txn.executeSql(`SELECT * FROM ${table} `, [], function (tx, res) {
            for (let i = 0; i < res.rows.length; ++i) {
                console.log('item:', res.rows.item(i))
            }
        })
    })
}

export function selectCurMomentInfo(id) {
    db.transaction(function (txn) {
        txn.executeSql(`SELECT * FROM ${table} where id = :id `, [id], function (tx, res) {
            for (let i = 0; i < res.rows.length; ++i) {
                console.log('item:', res.rows.item(i))
            }
        })
    })
}
