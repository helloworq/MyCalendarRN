import { getDBConnection } from '../RNSqlite'
import stroge from '../MhkvStroge'
import RNFS from 'react-native-fs'

const db = getDBConnection()
const userDropSql = 'DROP TABLE IF EXISTS USER'
const momentDropSql = 'DROP TABLE IF EXISTS MOMENT'
const regionDropSql = 'DROP TABLE IF EXISTS REGION'
const tagDropSql = 'DROP TABLE IF EXISTS TAG'

const userCreatSql = 'CREATE TABLE USER ( '
    + 'ID     INTEGER PRIMARY KEY AUTOINCREMENT ,'
    + 'NAME          VARCHAR(8)        ,'
    + 'AGE           INT               ,'
    + 'SIGN          VARCHAR(16)       ,'
    + 'ADDRESS       VARCHAR(16)       ,'
    + 'PASSWORD      VARCHAR(16)       ,'
    + 'MALE          VARCHAR(4)        ,'
    + 'AVATAR        VARCHAR(16)       ,'
    + 'EXTRA1        VARCHAR(16)       ,'
    + 'EXTRA2        VARCHAR(16)       ,'
    + 'ROLE_ID       INTEGER           '
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
const regionCreateSql = 'CREATE TABLE REGION ( '
    + 'ID     INTEGER PRIMARY KEY AUTOINCREMENT      ,'
    + 'REGION_CODE            VARCHAR(10)            ,'
    + 'PARENT_CODE            VARCHAR(10)            ,'
    + 'NAME                   VARCHAR(32)            ,'
    + 'PATH                   TEXT                    '
    + ')'
const tagCreateSql = 'CREATE TABLE TAG ( '
    + 'ID     INTEGER PRIMARY KEY AUTOINCREMENT      ,'
    + 'NAME                   VARCHAR(32)            ,'
    + 'ICON_CODE              VARCHAR(10)            ,'
    + 'NICK                   VARCHAR(32)            '
    + ')'


function init() {
    db.transaction((txn) => {
        txn.executeSql(userDropSql, [])
        txn.executeSql(momentDropSql, [])
        txn.executeSql(regionDropSql, [])
        txn.executeSql(tagDropSql, [])

        txn.executeSql(userCreatSql, [])
        txn.executeSql(momentCreatSql, [])
        txn.executeSql(regionCreateSql, [])
        txn.executeSql(tagCreateSql, [])

        txn.executeSql("INSERT INTO user (id,name,age,sign,address,password,male,role_id) VALUES (1,'李白',99,'危楼高百尺，手可摘星辰','长安','','男',0)", [])
    }, (e) => console.log(e), (e) => console.log(e))
}

function insertRegion() {
    const base = RNFS.ExternalDirectoryPath + '/region.sql'
    let start = 0
    let length = 10000000  //10mb


    RNFS.read(base, length, start).then(e => {
        RNFS.read(base, length, length).then((e2) => {
            RNFS.read(base, length, length * 2).then((e3) => {
                RNFS.read(base, length, length * 3).then((e4) => {
                    let json = e + e2 + e3 + e4
                    let tArray = json.split(';')//3589

                    db.transaction((txn) => {
                        for (var i = 0; i < tArray.length - 1; i++) {
                            let sql = tArray[i]

                            txn.executeSql(sql, [])

                            console.log('当前=>  ', i)
                        }
                    })
                    return 1
                }).then(() => {
                    console.log('done')
                })
            })
        })
    })
}

export function execInitSql() {
    stroge.set('id', 1)
    init()
    //insertRegion()
}

