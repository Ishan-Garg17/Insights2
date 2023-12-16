import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import _ from 'lodash';
import { checkLedgersTable, dropTable, fetchDataFromBackend, getAllItems, getAllVouchers, insertItem, searchItems } from '../DatabaseConfig';
import { SearchBar } from 'react-native-elements';

function HomeScreen({ navigation }) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearchValue] = useState(null);


    // const fetchData = rows => {
    //     const ledgers = rows.map(({ name }) => name);
    //     console.log('fetchData called', ledgers);
    //     setData(ledgers);
    // };
    const fetchData2 = rows => {
        const ledgers = rows.map(({ name }) => name);
        // console.log("fetchData2 called", ledgers[0]);
        setFilteredData(ledgers);
    };

    const filterData = (text) => {
        setSearchValue(text);
    };


    const clearSearch = () => {
        console.log("Clear Search");
        setSearchValue('');
        setFilteredData([])
    };

    useEffect(() => {
        console.log('main Effect Called');

        const fetchData = async (rows) => {
            // const ledgers = rows.map(({ name }) => name);
            // console.log("ledgers are", rows);
            setData(rows);
        };
        const checkAndFetchData = async () => {
            return new Promise((resolve) => {
                checkLedgersTable((result) => {
                    console.log("boolean value is", result);

                    if (result) {
                        console.log("Entered If");
                        resolve(getAllItems(fetchData));
                    } else {
                        console.log("Entered Else");
                        const abortController = new AbortController();
                        fetch('http://192.168.29.3:3000/ledgers', { signal: abortController.signal })
                            .then(response => response.json())
                            .then(data => {
                                const ledgerNamesArray = data.map(({ LedgerName }) => LedgerName);
                                console.log("ledgers fetched from server");
                                for (let item of ledgerNamesArray) {
                                    insertItem(item);
                                    // break;
                                }
                                resolve(getAllItems(fetchData));
                            })
                            .catch(error => {
                                if (error.name === 'AbortError') {
                                    console.log('Fetch aborted due to component unmount');
                                } else {
                                    console.error('Error: Agaya', error);
                                }
                            });
                        return () => {
                            abortController.abort();
                            console.log('main Effect Cleared');
                        };
                    }
                });
            });
        };

        const fetchDataAndCheck = async () => {
            await checkAndFetchData();
            console.log('main Effect Cleared');
        };

        fetchDataAndCheck();

        // Cleanup logic if needed
        return () => {
            console.log('main Effect Cleared');
        };
    }, []);


    useEffect(() => {
        if (searchValue) {
            console.log('Search useeffect called');
            const delay = 10; // Adjust the delay as needed
            const timerId = setTimeout(() => {
                searchItems(searchValue, fetchData2);
            }, delay);

            return () => {
                console.log('Search useeffect cleared');
                clearTimeout(timerId); // Clear the timeout if component unmounts or search value changes
            };
        }

    }, [searchValue]);


    const renderLedgers = items => {
        // console.log("rendered item is", items)
        return items.map((item, index) => (
            <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => navigation.navigate('DetailsScreen', { someKey: item })}>
                <Text style={styles.buttonText}>{item.name}</Text>
            </TouchableOpacity>
        ));
    };
    console.log('The Data is', data[0]);
    if (!data.length) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        );
    } else {
        return (
            <ScrollView>
                <SearchBar
                    placeholder="Search By Name"
                    onChangeText={text => filterData(text)}
                    onClear={clearSearch}
                    value={searchValue}
                    darkTheme
                    round
                    containerStyle={{
                        backgroundColor: 'transparent',
                        borderBottomColor: 'transparent',
                        borderTopColor: 'transparent',
                        marginTop: 20,
                        marginBottom: 20,
                        marginLeft: 10,
                    }}
                    inputContainerStyle={{ backgroundColor: '#ededed', width: 350, height: 60 }}
                    inputStyle={{ color: 'black' }}
                    placeholderTextColor="#616161"
                />
                {!filteredData.length
                    ? renderLedgers(data)
                    : renderLedgers(filteredData)}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#5605fd',
        padding: 20,
        margin: 8,
        borderRadius: 12,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default HomeScreen;
