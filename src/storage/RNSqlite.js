import SQLite from 'react-native-sqlite-2'

export const getDBConnection = () => {
  return SQLite.openDatabase('test.db', '1.0', '', 1)
};

// export const createTable = async (db: SQLiteDatabase) => {
//   // create table if not exists
//   const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
//         value TEXT NOT NULL
//     );`;

//   await db.executeSql(query);
// };