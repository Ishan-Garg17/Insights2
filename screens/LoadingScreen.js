import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Button,
    ScrollView
} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';

// import _ from 'lodash';
// import { getAllItems, searchItems } from '../DatabaseConfig';
// import { SearchBar } from 'react-native-elements';

function LoadingScreen({ navigation }) {
    // const [data, setData] = useState([]);
    // const [filteredData, setFilteredData] = useState([]);
    // const [searchValue, setSearchValue] = useState(null);


    // // const fetchData = rows => {
    // //     const ledgers = rows.map(({ name }) => name);
    // //     console.log('fetchData called', ledgers);
    // //     setData(ledgers);
    // // };
    // const fetchData2 = rows => {
    //     console.log("ledgers searched", rows[0]);
    //     // const ledgers = rows.map(({ name }) => name);
    //     // console.log("ledgers mapped", ledgers[0], ledgers);
    //     // console.log("fetchData2 called", ledgers[0]);
    //     setFilteredData(rows);
    // };

    // const filterData = (text) => {
    //     setSearchValue(text);
    // };


    // const clearSearch = () => {
    //     console.log("Clear Search");
    //     setSearchValue('');
    //     setFilteredData([])
    // };

    // useEffect(() => {
    //     console.log('main Effect Called');

    //     const fetchData = async (rows) => {
    //         setData(rows);
    //     };

    //     getAllItems(fetchData)
    //     // Cleanup logic if needed
    //     return () => {
    //         console.log('main Effect Cleared');
    //     };
    // }, []);


    // useEffect(() => {
    //     if (searchValue) {
    //         console.log('Search useeffect called');
    //         const delay = 10; // Adjust the delay as needed
    //         const timerId = setTimeout(() => {
    //             searchItems(searchValue, fetchData2);
    //         }, delay);

    //         return () => {
    //             console.log('Search useeffect cleared');
    //             clearTimeout(timerId); // Clear the timeout if component unmounts or search value changes
    //         };
    //     }

    // }, [searchValue]);


    // const renderLedgers = items => {
    //     console.log("rendered item is", items[0])
    //     return items.map((item, index) => (
    //         <TouchableOpacity
    //             key={index}
    //             style={styles.button}
    //             onPress={() => navigation.navigate('DetailsScreen', { someKey: item })}>
    //             <Text style={styles.buttonText}>{item.name}</Text>
    //         </TouchableOpacity>
    //     ));
    // };
    // console.log('The filtered Data is', filteredData[0]);
    // if (!data.length) {
    //     return (
    //         <View>
    //             <Text>Loading</Text>
    //         </View>
    //     );
    // } else {
    return (
        <ScrollView>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
                <Text style={styles.buttonText}>Hello</Text>
            </TouchableOpacity>
            {/* <SearchBar
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
                    : renderLedgers(filteredData)} */}
        </ScrollView>
    );
    // }
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

export default LoadingScreen;
