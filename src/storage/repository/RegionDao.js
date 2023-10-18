import { getDBConnection } from '../RNSqlite'
import stroge from '../MhkvStroge'

const db = getDBConnection()
const table = 'region'

const region = {
    id: 'ID',
    regionCode: 'REGION_CODE',
    parentCode: 'PARENT_CODE',
    path: 'PATH',
    name: 'NAME',
}

export function selectProvinceList(callback) {
    //获取所有省级行政区数据
    db.transaction(function (txn) {
        txn.executeSql(`SELECT * FROM REGION WHERE PARENT_CODE = 0`,
            [], (tx, res) => {
                callback(res.rows["_array"])
                //console.log('影响行=> ', res.rows["_array"])
            })
    })
}

export function selectSubRegion(parentCode, callback) {
    //根据符Code获取所有下钻数据
    db.transaction(function (txn) {
        txn.executeSql(`SELECT * FROM REGION WHERE PARENT_CODE = :parentCode AND REGION_CODE <> PARENT_CODE`,
            [parentCode], (tx, res) => callback(res.rows["_array"]))
    }, (e) => console.log(e), (e) => console.log(e))
}

export function selectParentRegion(parentCode, callback) {
    //根据子级获取父级
    db.transaction(function (txn) {
        txn.executeSql(`SELECT * FROM REGION WHERE PARENT_CODE = ( SELECT PARENT_CODE FROM REGION WHERE REGION_CODE = :code AND REGION_CODE <> PARENT_CODE )`,
            [parentCode], (tx, res) => callback(res.rows["_array"]))
    }, (e) => console.log(e), (e) => console.log(e))
}

export function selectParentCode(regionCode, callback) {
    //根据子级获取父级
    db.transaction(function (txn) {
        txn.executeSql(`SELECT PARENT_CODE FROM REGION WHERE REGION_CODE = :regionCode`,
            [regionCode], (tx, res) => {
                callback(res.rows["_array"][0]['PARENT_CODE'])
        })
    }, (e) => console.log(e), (e) => console.log(e))
}