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
    roleId: 'ROLE_ID',
    male: 'MALE'
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

export function selectCurUserMoment() {
    db.transaction(function (txn) {
        txn.executeSql(`select * from user u inner join moment m on u.id = m.user_id 
         where u.id = ${stroge.getNumber('id')} `, [], (tx, res) => {
            console.log(JSON.stringify(res))
        })
    }, (e) => console.log(e), (e) => console.log(e))
}