import { getDBConnection } from '../RNSqlite'
import stroge from '../MhkvStroge'

const db = getDBConnection()
const table = 'user'

const user = {
    id: 'ID',
    name: 'NAME',
    age: 'AGE',
    sign: 'SIGN',
    address: 'ADDRESS',
    password: 'PASSWORD',
    male: 'MALE',
    avatar: 'AVATAR',
    extra1: 'EXTRA1',
    extra2: 'EXTRA2',
    roleId: 'ROLE_ID',
}

export function updateUserAvatar(avatar) {
    db.transaction(function (txn) {
        txn.executeSql(`update user set avatar=:avatar where id=:id `,
            [avatar, stroge.getNumber('id')], function (tx, res) {
                console.log('影响行=> ', res.rowsAffected)
            })
    }, (e) => console.log(e), (e) => console.log(e))
}

export function updateUserInfo(user) {
    db.transaction(function (txn) {
        txn.executeSql(`update user set sign=:sign,name=:name,age=:age,address=:address,male=:male `,
            [user['SIGN'], user['NAME'], user['AGE'], user['ADDRESS'], user['MALE']], function (tx, res) {
                console.log('影响行=> ', res.rowsAffected)
            })
    }, (e) => console.log(e), (e) => console.log(e))
}

export function selectAllUser(callback) {
    db.transaction(function (txn) {
        txn.executeSql(`select * from ${table} `, [], (tx, res) => {
            callback(res.rows["_array"][0])
        })
    })
}

export function selectCurUserInfo(callback) {
    db.transaction(function (txn) {
        txn.executeSql(`select * from ${table} where id = ${stroge.getNumber('id')} `, [], (tx, res) => {
            callback(res.rows["_array"][0])
        })
    }, (e) => console.log(e), (e) => console.log(e))
}

export function selectCurUserMoment(callback) {
    db.transaction(function (txn) {
        txn.executeSql(`select * from user u inner join moment m on u.id = m.user_id 
         where u.id = ${stroge.getNumber('id')} `, [], (tx, res) => {
            callback(res.rows["_array"])
        })
    }, (e) => console.log(e), (e) => console.log(e))
}