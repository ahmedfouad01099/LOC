import {KeltechLocalDB} from '../../constants/LocalDB';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const dropDualTable = () => {
  KeltechLocalDB.transaction(txn => {
    txn.executeSql(
      'DROP TABLE dual',
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

export const createDualLOCsTable = () => {
  KeltechLocalDB.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE  dual
      (loc_id TEXT, route_id VARCHAR(50), origin TEXT, field_1 TEXT,  field_2 TEXT,
      field_3 TEXT,  MISC TEXT,  cable_status TEXT,  LOC_type TEXT,
      sync BOOLEAN, createdAt DATE, updatedAt DATE, user_id TEXT,
      location_id TEXT, destination_id TEXT, loc_id_destination TEXT, destination TEXT,
      destination_field_1 TEXT, destination_field_2 TEXT, destination_field_3 TEXT,
      syncDestination BOOLEAN, destination_createdAt TEXT, destination_updatedAt TEXT,
      longitude FLOAT,latitude FLOAT,radius FLOAT, updated BOOLEAN, created BOOLEAN)`,
      [],
      () => {
        AsyncStorage.setItem('dualTableCreated', 'true');
      },
      err => {
        console.log('111', err);
      },
    );
  });
};

export const inserDualLOCsValues = (
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
  destination_id,
  loc_id_destination,
  destination,
  destination_field_1,
  destination_field_2,
  destination_field_3,
  syncDestination,
  destination_createdAt,
  destination_updatedAt,
  longitude,
  latitude,
  radius,
  updated,
  created,
) => {
  KeltechLocalDB.transaction(txn => {
    txn.executeSql(
      `select * from dual where loc_id='${loc_id}'`,
      [],
      (tx, results) => {
        var len = results.rows.length;

        if (len === 0) {
          txn.executeSql(
            `INSERT INTO dual (loc_id, route_id, origin, field_1, field_2, field_3, 
                MISC, cable_status, LOC_type, sync, createdAt, updatedAt, user_id, location_id,
                destination_id, loc_id_destination, destination, destination_field_1,
                 destination_field_2, destination_field_3, syncDestination, 
                 destination_createdAt, destination_updatedAt, longitude, latitude,
                  radius, updated, created)
                 VALUES ('${loc_id}', '${route_id}', '${origin}', '${field_1}', '${field_2}','${field_3}',
                 '${MISC}','${cable_status}', '${LOC_type}','${sync}','${createdAt}'
                 ,'${updatedAt}','${user_id}','${location_id}','${destination_id}','${loc_id_destination}',
                 '${destination}','${destination_field_1}','${destination_field_2}','${destination_field_3}',
                 '${syncDestination}','${destination_createdAt}','${destination_updatedAt}','${longitude}',
                 '${latitude}','${radius}','${updated}','${created}')`,
            [],
            () => {
              //   alert('insertion dual loc completed...');
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
