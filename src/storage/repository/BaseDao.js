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
    + 'MALE          VARCHAR(4)        ,'
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


function init() {
    db.transaction((txn) => {
        txn.executeSql(userDropSql, [])
        txn.executeSql(momentDropSql, [])

        txn.executeSql(userCreatSql, [])
        txn.executeSql(momentCreatSql, [])

        txn.executeSql("INSERT INTO User (id,name,age,sign,address,password,male,role_id) VALUES (1,'李白',99,'危楼高百尺，手可摘星辰','长安','','男',0)", [])
        txn.executeSql("INSERT INTO Moment (id,user_id,content,images,tags,device,edited) VALUES (1,1,'将进酒，杯莫停','','','','')", [])
    }, (e) => console.log(e), (e) => console.log(e))
}

export function execInitSql() {
    stroge.set('id', 1)
    init()
}

