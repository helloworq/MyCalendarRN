import { getDBConnection } from '../RNSqlite'
import stroge from '../MhkvStroge'
import dayjs from 'dayjs'

const db = getDBConnection()
const table = 'tag'
const tag = {
    id: 'id',
    name: 'name',
    iconCode: 'icon_code',
    nick: 'nick'
}

export function saveTag(tags) {
    db.transaction(function (txn) {
        txn.executeSql(`select * from ${table}`, [], (tx, res) => {
            const savedTags = res.rows['_array']
            const toAdd = tags.filter(e => !e['ID'])

            const union = tags.filter(e => savedTags.some(ele => ele['ID'] === e['ID']))
            const toDelete = savedTags.filter(e => !union.some(ele => ele['ID'] === e['ID']))

            toAdd.forEach(e => insertTag(e))
            toDelete.forEach(e => deleteTag(e['ID']))
        })
    }, (e) => console.log(e), (e) => console.log(e))

}

export function findAllTag(callback) {
    db.transaction(function (txn) {
        txn.executeSql(`select * from ${table}`, [], (tx, res) => {
            callback(res.rows['_array'])
            console.log(res.rows['_array'])

        })
    }, (e) => console.log(e), (e) => console.log(e))
}

export function insertTag(tag) {
    db.transaction(function (txn) {
        txn.executeSql(`insert into tag(name,icon_code,nick) values(:name,:iconCode,:nick)`, [tag['NAME'], tag['ICON_CODE'], ''], (tx, res) => {
            console.log('影响行=> ', res.rowsAffected)
        })
    }, (e) => console.log(e), (e) => console.log(e))
}

export function deleteTag(id) {
    db.transaction(function (txn) {
        txn.executeSql(`delete from tag where ID = :id`, [id], (tx, res) => {
            console.log('影响行=> ', res.rowsAffected)
        })
    }, (e) => console.log(e), (e) => console.log(e))
}
