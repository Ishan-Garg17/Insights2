import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
} from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import _ from 'lodash';
import { getAllItems, searchItems } from '../DatabaseConfig';
import { SearchBar } from 'react-native-elements';
import { Animated } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const fetchData2 = useCallback(rows => {
        setFilteredData(rows);
    }, []);

    const filterData = text => {
        setSearchValue(text);
    };

    const clearSearch = useCallback(() => {
        setSearchValue('');
        setFilteredData([]);
    }, []);

    useEffect(() => {
        const fetchData = async rows => {
            setData(rows);
        };

        getAllItems(fetchData);

        return () => {
            // Cleanup logic if needed
        };
    }, []);

    useEffect(() => {
        if (searchValue) {
            console.log('Search useeffect called');
            const delay = 300; // Adjust the delay as needed
            const timerId = setTimeout(() => {
                searchItems(searchValue, fetchData2);
            }, delay);
            return () => {
                console.log('Search useeffect cleared');
                clearTimeout(timerId); // Clear the timeout if component unmounts or search value changes
            };
        }
    }, [searchValue]);

    const scrollY = new Animated.Value(0);
    const headerTranslateY = scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [0, -50],
        extrapolate: 'clamp',
    });

    const renderLedgerItem = useCallback(({ item }) => (
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('DetailsScreen', { someKey: item })}>
            <Text style={styles.buttonText}>{item.name}</Text>
        </TouchableOpacity>
    ), [navigation]);

    console.log("data is", data);
    if (!data.length) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        );
    }
    else {
        return (
            <>
                <View style={styles.container}>
                    <SearchBar
                        placeholder="Search By Name"
                        onChangeText={filterData}
                        onClear={clearSearch}
                        value={searchValue}
                        darkTheme
                        round
                        containerStyle={{
                            backgroundColor: 'transparent',
                            borderBottomColor: 'transparent',
                            borderTopColor: 'transparent',
                        }}
                        inputContainerStyle={{
                            backgroundColor: '#ededed',
                            width: 340,
                            height: 60,
                            marginLeft: 16
                        }}
                        inputStyle={{ color: 'black' }}
                        placeholderTextColor="#616161"
                    />
                </View>
                <View style={{ flex: 8 }}>

                    <FlatList
                        data={!filteredData.length ? data : filteredData}
                        // style={{ marginTop: 20 }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderLedgerItem}

                    />
                </View>
            </>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // header: {
    //     position: 'absolute',
    //     width: '100%',
    //     zIndex: 1,
    // },
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

export default React.memo(HomeScreen);
