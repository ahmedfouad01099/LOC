import {KeltechLocalDB} from '../../constants/LocalDB';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const dropLocationTable = () => {
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

export const createLocationTable = () => {
  KeltechLocalDB.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS location
      (id TEXT, name VARCHAR(20),longitude FLOAT,latitude FLOAT,radius FLOAT
      ,sync BOOLEAN,createdAt DATE, updatedAt DATE,project_id TEXT)`,
      [],
      () => {
        AsyncStorage.setItem('locationTableCreated', 'true');
      },
      err => {
        console.log('111', err);
      },
    );
  });
};

export const inserLocationtValues = (
  id,
  name,
  longitude,
  latitude,
  radius,
  sync,
  createdAt,
  updatedAt,
  project_id,
) => {
  KeltechLocalDB.transaction(txn => {
    txn.executeSql(
      `select * from location where id='${id}'`,
      [],
      (tx, results) => {
        var len = results.rows.length;

        if (len === 0) {
          txn.executeSql(
            `INSERT INTO location (id, name, longitude, latitude, radius, sync, createdAt, updatedAt, project_id)
                 VALUES ('${id}', '${name}', ${longitude}, ${latitude}, ${radius}, '${sync}', '${createdAt}', '${updatedAt}', '${project_id}')`,
            [],
            () => {
              alert('insertion completed...');
            },
            err => {
              console.log('130 ', err);
            },
          );
        } else {
          alert('location already saved!!!!');
        }
      },
      err => {
        console.log('57', err);
      },
    );
  });
};
