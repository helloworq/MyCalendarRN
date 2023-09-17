import { getDBConnection } from '../RNSqlite'
import stroge from '../MhkvStroge'

const db = getDBConnection()
const userDropSql = 'DROP TABLE IF EXISTS USER'
const momentDropSql = 'DROP TABLE IF EXISTS MOMENT'

const userCreatSql = 'CREATE TABLE USER ( '
    + 'ID     INTEGER PRIMARY KEY AUTOINCREMENT ,'
    + 'NAME          VARCHAR(8)        ,'
    + 'AGE           INT               ,'
    + 'SIGN          VARCHAR(16)       ,'
    + 'ADDRESS       VARCHAR(16)       ,'
    + 'PASSWORD      VARCHAR(16)       ,'
    + 'ROLE_ID       INTEGER            '
    + ')'
const momentCreatSql = 'CREATE TABLE MOMENT ( '
    + 'ID     INTEGER PRIMARY KEY AUTOINCREMENT ,'
    + 'USER_ID                INTEGER                ,'
    + 'CONTENT                TEXT                   ,'
    + 'IMAGES                 TEXT                   ,'
    + 'TAGS                   TEXT                   ,'
    + 'DEVICE                 VARCHAR(16)            ,'
    + 'EDITED                 INTEGER                ,'
    + 'CREATE_TIME            VARCHAR(24)            ,'
    + 'LAST_UPDATE_TIME       VARCHAR(24)             '
    + ')'


function init() {
    db.transaction((txn) => {
        txn.executeSql(userDropSql, [])
        txn.executeSql(momentDropSql, [])

        txn.executeSql(userCreatSql, [])
        txn.executeSql(momentCreatSql, [])

        txn.executeSql("INSERT INTO User (id,name,age,sign,address,password,role_id) VALUES (1,'',0,'','','',0)", [])
    }, (e) => console.log(e), (e) => console.log(e))
}

export function execInitSql() {
    stroge.set('id', 1)
    init()
}

