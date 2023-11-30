import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import _ from 'lodash';
import { checkLedgersTable, dropTable, getAllItems, insertItem, searchItems } from '../DatabaseConfig';
import { SearchBar } from 'react-native-elements';

function HomeScreen({ navigation }) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearchValue] = useState('');


    const fetchData = rows => {
        const ledgers = rows.map(({ name }) => name);
        console.log('fetchData called', ledgers);
        setData(ledgers);
    };
    const fetchData2 = rows => {
        const ledgers = rows.map(({ name }) => name);
        setFilteredData(ledgers);
    };

    const filterData = (text) => {
        setSearchValue(text);
    };


    const clearSearch = () => {
        setSearchValue('');
    };

    useEffect(() => {
        console.log('main Effect Called');
        if (checkLedgersTable()) {
            console.log("Entered If");
            getAllItems(fetchData);
            return () => {
                console.log('main Effect Cleared');
            };
        }
        else {
            console.log("Entered Else");
            const abortController = new AbortController();
            fetch('http://192.168.29.3:3000/ledgers', { signal: abortController.signal })
                .then(response => response.json())
                .then(data => {
                    const ledgerNamesArray = data.map(({ LedgerName }) => LedgerName);
                    for (let item of ledgerNamesArray) {
                        insertItem(item);
                    }
                    getAllItems(fetchData);
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


    }, []);

    useEffect(() => {
        console.log('Search useeffect called');
        const delay = 0; // Adjust the delay as needed
        const timerId = setTimeout(() => {
            searchItems(searchValue, fetchData2);
        }, delay);

        return () => {
            console.log('Search useeffect cleared');
            clearTimeout(timerId); // Clear the timeout if component unmounts or search value changes
        };
    }, [searchValue]);


    const renderLedgers = items => {
        return items.map((item, index) => (
            <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => navigation.navigate('Details', { item })}>
                <Text style={styles.buttonText}>{item}</Text>
            </TouchableOpacity>
        ));
    };
    console.log('The Data is', data);
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
