import {KeltechLocalDB} from '../../constants/LocalDB';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createLOGsTable = () => {
  KeltechLocalDB.transaction(txn => {
    // txn.executeSql(
    //   'DROP TABLE logs',
    //   [],
    //   () => {
    //     console.log('table dorpped successfull.');
    //   },
    //   err => {
    //     console.log('8', err);
    //   },
    // );

    txn.executeSql(
      `CREATE TABLE  logs
      (gid TEXT, result TEXT, table INT, _time DATE,  method TEXT, 
        user_id TEXT,  description TEXT,  level TEXT,  state BOOLEAN,
        status_code INT, user_name TEXT)`,
      [],
      () => {
        AsyncStorage.setItem('logsTableCreated', 'true');
      },
      err => {
        console.log('111', err);
      },
    );
  });
};

export const inserLOGsValues = (
  gid,
  result,
  table,
  _time,
  method,
  user_id,
  description,
  level,
  state,
  status_code,
  user_name,
) => {
  KeltechLocalDB.transaction(txn => {
    txn.executeSql(
      `select * from logs where gid='${gid}'`,
      [],
      (tx, results) => {
        var len = results.rows.length;

        if (len === 0) {
          txn.executeSql(
            `INSERT INTO logs (gid, result, table, _time, method, user_id, 
                description, level, state, status_code, user_name, updated, created)
                 VALUES ('${gid}', '${result}', '${table}', '${_time}', '${method}',
                 '${user_id}','${description}','${level}','${state}','${status_code}',
                 '${user_name}')`,
            [],
            () => {
              alert('insertion log completed...');
            },
            err => {
              console.log('56 insertion log err ', err);
            },
          );
        } else {
          //   alert('Logs already saved!!!!');
          return;
        }
      },
      err => {
        console.log('57', err);
      },
    );
  });
};
