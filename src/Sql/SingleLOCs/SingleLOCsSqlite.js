import {KeltechLocalDB} from '../../constants/LocalDB';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const dropSingleTable = () => {
  KeltechLocalDB.transaction(txn => {
    txn.executeSql(
      'DROP TABLE single',
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

export const createSingleLOCsTable = () => {
  KeltechLocalDB.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE  single
      (loc_id TEXT, route_id VARCHAR(50), origin TEXT, field_1 TEXT,  field_2 TEXT, 
      field_3 TEXT,  MISC TEXT,  cable_status TEXT,  LOC_type TEXT,
      sync BOOLEAN, createdAt DATE, updatedAt DATE, user_id TEXT, 
      location_id TEXT, updated BOOLEAN, created BOOLEAN)`,
      [],
      () => {
        AsyncStorage.setItem('singleTableCreated', 'true');
      },
      err => {
        console.log('111', err);
      },
    );
  });
};

export const inserSingleLOCsValues = (
  loc_id,
  route_id,
  origin,
  field_1,
  field_2,
  field_3,
  MISC,
  cable_status,
  LOC_type,
  sync,
  createdAt,
  updatedAt,
  user_id,
  location_id,
  updated,
  created,
) => {
  KeltechLocalDB.transaction(txn => {
    txn.executeSql(
      `select * from single where loc_id='${loc_id}'`,
      [],
      (tx, results) => {
        var len = results.rows.length;

        if (len === 0) {
          txn.executeSql(
            `INSERT INTO single (loc_id, route_id, origin, field_1, field_2, field_3, 
                MISC, cable_status, LOC_type, sync, createdAt, updatedAt,
                user_id, location_id, updated, created)
                VALUES ('${loc_id}', '${route_id}', '${origin}', '${field_1}', '${field_2}','${field_3}',
                '${MISC}','${cable_status}', '${LOC_type}','${sync}','${createdAt}'
                ,'${updatedAt}','${user_id}','${location_id}', '${updated}', '${created}')`,
            [],
            () => {
              //   alert('insertion single loc completed...');
              return;
            },
            err => {
              console.log('56 insertion single loc err ', err);
            },
          );
        } else {
          //   alert('dual loc already saved!!!!');
          return;
        }
      },
      err => {
        console.log('57', err);
      },
    );
  });
};
