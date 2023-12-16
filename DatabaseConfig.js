/* eslint-disable prettier/prettier */
// DatabaseHelper.js
// import * as SQLite from 'expo-sqlite';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({
    name: 'new_t11222rial12_11db',
});
// Function to create a table
const createTable = () => {
    console.log('Create Table Called');
    db.transaction(tx => {
        tx.executeSql(`
    CREATE TABLE IF NOT EXISTS Ledgers (
        LedgerID INTEGER PRIMARY KEY AUTOINCREMENT,
        LedgerName TEXT NOT NULL

    )
`);
        tx.executeSql(`
  CREATE TABLE IF NOT EXISTS PurchaseVouchers (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    LedgerID INTEGER, 
    ADDRESS TEXT,
    DATE TEXT,
    GUID TEXT,
    STATENAME TEXT,
    NARRATION TEXT,
    COUNTRYOFRESIDENCE TEXT,
    PARTYGSTIN TEXT,
    PLACEOFSUPPLY TEXT,
    PARTYNAME TEXT,
    PARTYLEDGERNAME TEXT,
    VOUCHERNUMBER TEXT,
    TOTALAMOUNT REAL,
    PURCHASELOCAL REAL,
    CGST REAL,
    SGST REAL,
    FOREIGN KEY (LedgerID) REFERENCES Ledgers(LedgerID) 
  )
`);
        tx.executeSql(`
        CREATE TABLE IF NOT EXISTS StockInventory (
            stockItemID INTEGER PRIMARY KEY AUTOINCREMENT,
            BASEUNITS TEXT,
            GUID TEXT,
            OPENINGBALANCE INTEGER,
            HSNCODE TEXT,
            ITEMNAME TEXT
        )
    `);

        tx.executeSql(`
        CREATE TABLE IF NOT EXISTS SalesVouchers (
            voucherID INTEGER PRIMARY KEY AUTOINCREMENT,
            LedgerID INTEGER,
            ADDRESS TEXT,
            DATE DATE,
            GUID TEXT,
            STATENAME TEXT,
            NARRATION TEXT,
            COUNTRYOFRESIDENCE TEXT,
            PARTYGSTIN TEXT,
            PLACEOFSUPPLY TEXT,
            PARTYNAME TEXT,
            VOUCHERNUMBER TEXT,
            TERMS TEXT,
            SHIPPEDBY TEXT,
            VEHICLENO TEXT,
            DETAILS TEXT,
            totalAmount DECIMAL(10, 2),
            IGSTSALE DECIMAL(10, 2)
        )
    `)

        tx.executeSql(`
        PRAGMA foreign_keys = ON; -- Enable foreign key support
        ALTER TABLE SalesVouchers
        ADD CONSTRAINT FK_ledgerID FOREIGN KEY (ledgerID) REFERENCES ledgers(ledgerID);
    `);
        tx.executeSql(`
        CREATE TABLE IF NOT EXISTS SalesItems (
            itemID INTEGER PRIMARY KEY AUTOINCREMENT,
            voucherID INTEGER, 
            stockItemID INTEGER, 
            STOCKITEM TEXT,
            HSNCODE TEXT,
            RATE TEXT,
            DISCOUNT DECIMAL(10, 2),
            AMOUNT DECIMAL(10, 2),
            ACTUALQTY TEXT,
            
            CONSTRAINT FK_voucherID FOREIGN KEY (voucherID) REFERENCES SalesVouchers(voucherID)
            CONSTRAINT FK_stockItemID FOREIGN KEY (stockItemID) REFERENCES StockInventory(stockItemID)
        )
    `);
        tx.executeSql(`
        CREATE TABLE IF NOT EXISTS PaymentVouchers (
                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                 LedgerID INTEGER, 
                DATE DATE,
                NARRATION TEXT,
                VOUCHERNUMBER NUMBER,
                GUID TEXT,
                STATENAME TEXT,
                COUNTRYOFRESIDENCE TEXT,
                PARTYGSTIN TEXT,
                PARTYLEDGERNAME TEXT,
                GSTREGISTRATIONTYPE TEXT,
                TRANSACTIONTYPE TEXT,
                PAYMENTFAVOURING TEXT,
                CHEQUECROSSCOMMENT TEXT,
                AMOUNT DECIMAL(10, 2),
                LEDGERNAME TEXT,
                FOREIGN KEY (LedgerID) REFERENCES Ledgers(LedgerID) 
    )
    `);
        tx.executeSql(`
         CREATE TABLE IF NOT EXISTS ReceiptVouchers (
                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                 LedgerID INTEGER, 
                DATE DATE,
                NARRATION TEXT,
                VOUCHERNUMBER NUMBER,
                GUID TEXT,
                PARTYGSTIN TEXT,
                PARTYLEDGERNAME TEXT,
                TRANSACTIONTYPE TEXT,
                PAYMENTFAVOURING TEXT,
                CHEQUECROSSCOMMENT TEXT,
                AMOUNT DECIMAL(10, 2),
                FOREIGN KEY (LedgerID) REFERENCES Ledgers(LedgerID) 
    )
    `);
    });
};

const checkLedgersTable = (callback) => {
    db.transaction(txn => {
        txn.executeSql(
            'SELECT * FROM Ledgers',
            null,
            (tx, result) => {
                console.log('Checking Table Ledgers:');
                callback(true)
                return true;
            },
            error => {
                console.error('Error fetching items:');
                callback(false)
                return false;
            },
        );
    });
}
// Function to insert an item into the table
const insertItem = name => {
    console.log("name received is", name);
    if (!db) {
        console.error('Database not available');
        return;
    }

    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO Ledgers (LedgerName) VALUES (?)',
            [name],
            (txObj, resultSet) => {
                console.log('item inserted');
            },
            (txObj, error) => {
                console.error("Error executing SQL statement:", error);
            },
        );
    }, (error) => {
        console.error("Error in transaction:", error);
    });
};

const searchItems = (searchQuery, callback) => {
    let query = 'SELECT * FROM Ledgers';
    let params = [];

    if (searchQuery) {
        query += ' WHERE LedgerName LIKE ?';
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
                        results.push({ id: item.LedgerID, name: item.LedgerName });
                    }
                    console.log('fetching search items:');
                }
                callback(results);
            },
            error => {
                console.error('Error fetching search items:', error);
            },
        );
    });
};
// Function to fetch all items from the table
const getAllItems = callback => {
    db.transaction(txn => {
        txn.executeSql(
            'SELECT * FROM Ledgers',
            null,
            (tx, result) => {
                let len = result.rows.length;

                let results = [];
                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let item = result.rows.item(i);
                        results.push({ id: item.LedgerID, name: item.LedgerName });
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

const getTotalPurchaseAmount = (id, callback) => {
    db.transaction(tx => {
        tx.executeSql(`SELECT SUM(TOTALAMOUNT) AS total_sum FROM PurchaseVouchers WHERE LedgerID = ${id}`, [], (tx, results) => {
            const totalSum = results.rows.item(0).total_sum;
            console.log('Total Sum of CGST, SGST, PURCHASELOCAL:', totalSum);
            callback(totalSum)
        })
    })
}

const getTotalSalesAmount = (id, callback) => {
    db.transaction(tx => {
        tx.executeSql(`SELECT SUM(TOTALAMOUNT) AS total_sum FROM SalesVouchers WHERE LedgerID = ${id}`, [], (tx, results) => {
            const totalSum = results.rows.item(0).total_sum;
            console.log('Total Sum of sales', totalSum);
            callback(totalSum)
        })
    })
}

const getPurchaseVouchers = (id, callback) => {

    db.transaction(txn => {
        txn.executeSql(
            `SELECT * FROM PurchaseVouchers WHERE LedgerID = ${id}`,
            null,
            (tx, result) => {
                let len = result.rows.length;

                let results = [];
                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let item = result.rows.item(i);
                        results.push(item);
                    }
                    // console.log('fetching items:');
                    callback(results)
                }
                // callback(results);
                return true;
            },
            error => {
                console.error('Error fetching Vouchers', error);
                return false;
            },
        );
    });
}


const dropTable = () => {
    db.transaction((txn) => {
        txn.executeSql(
            'DROP TABLE IF EXISTS Ledgers',
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


async function fetchDataFromBackend() {
    try {
        const purchaseResponse = await fetch('http://192.168.29.3:3000/getPurchaseV');
        const salesResponse = await fetch('http://192.168.29.3:3000/getSalesV');
        const saleItemsres = await fetch('http://192.168.29.3:3000/getSaleItems');
        const paymentVouchersres = await fetch('http://192.168.29.3:3000/getPaymentV');
        const receiptVouchersres = await fetch('http://192.168.29.3:3000/getReceiptV');
        const inventoryres = await fetch('http://192.168.29.3:3000/getInventory');

        const purchaseVouchersData = await purchaseResponse.json();
        const salesVouchersData = await salesResponse.json();
        const saleItemsData = await saleItemsres.json();
        const paymentVouchersData = await paymentVouchersres.json();
        const receiptVouchersData = await receiptVouchersres.json();
        const inventoryData = await inventoryres.json();


        storePurchaseVouchers(purchaseVouchersData)
        storeSalesVouchers(salesVouchersData)
        storePaymentVouchers(paymentVouchersData)
        storeReceiptVouchers(receiptVouchersData)
        storeSaleItems(saleItemsData)
        storeInventoryData(inventoryData)

        // console.log("data received is ", data[0]);

    } catch (error) {
        console.error('Error fetching data from backend', error);
        throw error;
    }
}


async function storePurchaseVouchers(data) {
    try {
        await db.transaction(tx => {
            // Insert data into the table
            console.log("purchase vouchers received are", data[0]);
            data.forEach(item => {
                tx.executeSql(
                    `INSERT INTO PurchaseVouchers (LedgerID, ADDRESS, DATE, GUID, STATENAME, NARRATION, COUNTRYOFRESIDENCE, PARTYGSTIN, PLACEOFSUPPLY, PARTYNAME, PARTYLEDGERNAME, VOUCHERNUMBER, TOTALAMOUNT, PURCHASELOCAL, CGST, SGST) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                    [item.LedgerID, item.ADDRESS, item.DATE, item.GUID, item.STATENAME, item.NARRATION, item.COUNTRYOFRESIDENCE, item.PARTYGSTIN, item.PLACEOFSUPPLY, item.PARTYNAME, item.PARTYLEDGERNAME, item.VOUCHERNUMBER, item.TOTALAMOUNT, item.PURCHASELOCAL, item.CGST, item.SGST,]
                );
            });
        });
        console.log('Purchase Vouchers Data stored in the database successfully');
    } catch (error) {
        console.error('Error storing data in the database', error);
        throw error;
    }
}


async function storeSalesVouchers(data) {
    try {
        await db.transaction(tx => {
            // Insert data into the table
            console.log("Sales vouchers received are", data[0]);
            data.forEach(item => {
                tx.executeSql(
                    `INSERT INTO SalesVouchers ( LedgerID,
                            ADDRESS,
                            DATE,
                            GUID,
                            STATENAME,
                            NARRATION,
                            COUNTRYOFRESIDENCE,
                            PARTYGSTIN,
                            PLACEOFSUPPLY,
                            PARTYNAME,
                            VOUCHERNUMBER,
                            totalAmount,
                            SHIPPEDBY,
                            VEHICLENO,
                            DETAILS,
                            IGSTSALE) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                    [item.LedgerID, item.ADDRESS, item.DATE, item.GUID, item.STATENAME, item.NARRATION, item.COUNTRYOFRESIDENCE, item.PARTYGSTIN, item.PLACEOFSUPPLY, item.PARTYNAME, item.VOUCHERNUMBER, item.totalAmount, item.SHIPPEDBY, item.VEHICLENO, item.DETAILS, item.IGSTSALE]
                );
            });
        });
        console.log('Sales Vouchers Data stored in the database successfully');
    } catch (error) {
        console.error('Error storing data in the database', error);
        throw error;
    }
}

async function storeSaleItems(data) {
    try {
        await db.transaction(tx => {
            // Insert data into the table
            console.log("Sales Items received are", data[0]);
            data.forEach(item => {
                tx.executeSql(
                    `INSERT INTO SalesItems ( voucherID,
                        stockItemID,
                        STOCKITEM,
                        HSNCODE,
                        RATE,
                        DISCOUNT,
                        AMOUNT,
                        ACTUALQTY
        ) VALUES (?,?,?,?,?,?,?,?)`,
                    [item.voucherID,
                    item.stockItemID,
                    item.STOCKITEM,
                    item.HSNCODE,
                    item.RATE,
                    item.DISCOUNT,
                    item.AMOUNT,
                    item.ACTUALQTY]
                );
            });
        });
        console.log('Sales Items Data stored in the database successfully');
    } catch (error) {
        console.error('Error storing data in the database', error);
        throw error;
    }
}


async function storePaymentVouchers(data) {
    try {
        await db.transaction(tx => {
            // Insert data into the table
            console.log("Payment Vouchers received are", data[0]);
            data.forEach(item => {
                tx.executeSql(
                    `INSERT INTO PaymentVouchers (
                         LedgerID,
                         DATE,
                         NARRATION,
                         VOUCHERNUMBER,
                         GUID,
                         STATENAME,
                         COUNTRYOFRESIDENCE,
                         PARTYGSTIN,
                         PARTYLEDGERNAME,
                         GSTREGISTRATIONTYPE,
                         TRANSACTIONTYPE,
                         PAYMENTFAVOURING,
                         CHEQUECROSSCOMMENT,
                         AMOUNT,
                         LEDGERNAME
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                    [item.LedgerID,
                    item.DATE,
                    item.NARRATION,
                    item.VOUCHERNUMBER,
                    item.GUID,
                    item.STATENAME,
                    item.COUNTRYOFRESIDENCE,
                    item.PARTYGSTIN,
                    item.PARTYLEDGERNAME,
                    item.GSTREGISTRATIONTYPE,
                    item.TRANSACTIONTYPE,
                    item.PAYMENTFAVOURING,
                    item.CHEQUECROSSCOMMENT,
                    item.AMOUNT,
                    item.LEDGERNAME]
                );
            });
        });
        console.log('Payment Vouchers stored in the database successfully');
    } catch (error) {
        console.error('Error storing data in the database', error);
        throw error;
    }
}



async function storeReceiptVouchers(data) {
    try {
        await db.transaction(tx => {
            // Insert data into the table
            console.log("Receipt Vouchers received are", data[0]);
            data.forEach(item => {
                tx.executeSql(
                    `INSERT INTO ReceiptVouchers (
                         LedgerID,
                         DATE,
                         NARRATION,
                         VOUCHERNUMBER,
                         GUID,
                         PARTYGSTIN,
                         PARTYLEDGERNAME,
                         TRANSACTIONTYPE,
                         PAYMENTFAVOURING,
                         CHEQUECROSSCOMMENT,
                         AMOUNT
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
                    [item.LedgerID,
                    item.DATE,
                    item.NARRATION,
                    item.VOUCHERNUMBER,
                    item.GUID,
                    item.PARTYGSTIN,
                    item.PARTYLEDGERNAME,
                    item.TRANSACTIONTYPE,
                    item.PAYMENTFAVOURING,
                    item.CHEQUECROSSCOMMENT,
                    item.AMOUNT]
                );
            });
        });
        console.log('Receipt Vouchers stored in the database successfully');
    } catch (error) {
        console.error('Error storing data in the database', error);
        throw error;
    }
}


async function storeInventoryData(data) {
    try {
        await db.transaction(tx => {
            // Insert data into the table
            console.log("Stock Items Data received is", data[0]);
            data.forEach(item => {
                tx.executeSql(
                    `INSERT INTO StockInventory (
                        BASEUNITS, GUID, OPENINGBALANCE, HSNCODE, ITEMNAME
        ) VALUES (?, ?, ?, ?, ?)`,
                    [item.BASEUNITS, item.GUID, item.OPENINGBALANCE, item.HSNCODE, item.ITEMNAME]
                );
            });
        });
        console.log('Stock Items stored in the database successfully');
    } catch (error) {
        console.error('Error storing data in the database', error);
        throw error;
    }
}







export { createTable, insertItem, getAllItems, searchItems, checkLedgersTable, dropTable, fetchDataFromBackend, getTotalPurchaseAmount, getPurchaseVouchers, getTotalSalesAmount };
