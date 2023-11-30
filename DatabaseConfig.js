/* eslint-disable prettier/prettier */
// DatabaseHelper.js
// import * as SQLite from 'expo-sqlite';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({
    name: 'insights_app_rn',
});
// Function to create a table
const createTable = () => {
    console.log('Create Table Called');
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS ledgers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)',
        );
    });
};

const checkLedgersTable = () => {
    db.transaction(txn => {
        txn.executeSql(
            'SELECT * FROM ledgers',
            null,
            (tx, result) => {

                return true;
            },
            error => {
                console.error('Error fetching items:', error);
                return false;
            },
        );
    });
}
// Function to insert an item into the table
const insertItem = name => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO ledgers (name) values (?)',
            [name],
            (txObj, resultSet) => {
                console.log('item inserted');
            },
            (txObj, error) => console.log(error),
        );
    });
};

const searchItems = (searchQuery, callback) => {
    let query = 'SELECT * FROM ledgers';
    let params = [];

    if (searchQuery) {
        query += ' WHERE name LIKE ?';
        params = [`%${searchQuery}%`];
    }

    db.transaction(txn => {
        txn.executeSql(
            query,
            params,
            (tx, result) => {
                let len = result.rows.length;

                let results = [];
                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let item = result.rows.item(i);
                        results.push({ id: item.id, name: item.name });
                    }
                    console.log('fetching items:');
                }
                callback(results);
            },
            error => {
                console.error('Error fetching items:', error);
            },
        );
    });
};
// Function to fetch all items from the table
const getAllItems = callback => {
    db.transaction(txn => {
        txn.executeSql(
            'SELECT * FROM ledgers',
            null,
            (tx, result) => {
                let len = result.rows.length;

                let results = [];
                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let item = result.rows.item(i);
                        results.push({ id: item.id, name: item.name });
                    }
                    console.log('fetching items:');
                }
                callback(results);
                return true;
            },
            error => {
                console.error('Error fetching items:', error);
                return false;
            },
        );
    });
};

const dropTable = () => {
    db.transaction((txn) => {
        txn.executeSql(
            'DROP TABLE IF EXISTS ledgers',
            [],
            (tx, result) => {
                console.log('Table dropped successfully');
            },
            (error) => {
                console.error('Error dropping table:', error);
            }
        );
    });
}
export { createTable, insertItem, getAllItems, searchItems, checkLedgersTable, dropTable };
