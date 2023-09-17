import { getDBConnection } from '../RNSqlite'
import stroge from '../MhkvStroge'

const db = getDBConnection()
const table = 'user'

const user = {
    id: 'id',
    name: 'name',
    age: 'age',
    address: 'address',
    password: 'password',
    roleId: 'role_id',
}

export function updateUserInfo(user) {
    db.transaction(function (txn) {
        txn.executeSql(`update user set name=:name,age=:age,address=:address,password=:password,role_id=:roleId `,
            [user.name, user.age, user.address, user.password, user.roleId], function (tx, res) {
                console.log('影响行=> ', res.rowsAffected)
            })
    })
}

export function selectAllUser() {
    console.log('try....')
    db.transaction(function (txn) {
        txn.executeSql(`select * from ${table} `, [], function (tx, res) {
            for (let i = 0; i < res.rows.length; ++i) {
                console.log('item:', res.rows.item(i))
            }
        })
    })
}

export function selectCurUserInfo() {
    db.transaction(function (txn) {
        txn.executeSql(`select * from ${table} where id = ${stroge.getNumber('id')} `, [], function (tx, res) {
            for (let i = 0; i < res.rows.length; ++i) {
                console.log('item:', res.rows.item(i))
            }
        })
    }, (e) => console.log(e), (e) => console.log(e))
}