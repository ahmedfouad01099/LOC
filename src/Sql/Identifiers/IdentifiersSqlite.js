import {KeltechLocalDB} from '../../constants/LocalDB';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const dropIdentifierTable = () => {
  KeltechLocalDB.transaction(txn => {
    txn.executeSql(
      'DROP TABLE location',
      [],
      () => {
        console.log('table dorpped successfull.');
      },
      err => {
        console.log('8', err);
      },
    );
  });
};

export const createIdentifierTable = () => {
  KeltechLocalDB.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS identifiers
      (gid TEXT, name VARCHAR(20), sync BOOLEAN, 
      createdAt DATE, updatedAt DATE)`,
      [],
      () => {
        AsyncStorage.setItem('identifierTableCreated', 'true');
      },
      err => {
        console.log('111', err);
      },
    );
  });
};

export const inserIdentifierValues = (
  gid,
  name,
  sync,
  createdAt,
  updatedAt,
) => {
  KeltechLocalDB.transaction(txn => {
    txn.executeSql(
      `select * from identifiers where gid='${gid}'`,
      [],
      (tx, results) => {
        var len = results.rows.length;

        if (len === 0) {
          txn.executeSql(
            `INSERT INTO identifiers (gid, name, sync, createdAt, updatedAt)
                 VALUES ('${gid}', '${name}', '${sync}', '${createdAt}', '${updatedAt}')`,
            [],
            () => {
              alert('insertion completed...');
            },
            err => {
              console.log('56 insertion err ', err);
            },
          );
        } else {
          //   alert('Identifier already saved!!!!');
          return;
        }
      },
      err => {
        console.log('57', err);
      },
    );
  });
};
