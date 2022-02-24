import {openDatabase} from 'react-native-sqlite-storage';

export const KeltechLocalDB = openDatabase({name: 'keltechDB.db'});
