import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import { getPurchaseVouchers, getSalesVouchers } from '../DatabaseConfig';

const SalesVouchersScreen = ({ navigation }) => {
    const [vouchers, setVouchers] = useState([]); // Corrected state initialization
    const route = useRoute();
    const { someKey } = route.params;

    useEffect(() => {
        const printData = (fetchedVouchers) => {
            console.log("Fetching Vouchers", fetchedVouchers.length);
            setVouchers(fetchedVouchers);
        };

        getSalesVouchers(someKey.id, printData)
    }, [someKey.id]); // Corrected dependency array

    const renderItem = ({ item }) => (
        <TouchableOpacity activeOpacity={1} style={styles.mainList}
            onPress={() => navigation.navigate('SalesVoucherDetails', { voucher: item })}
        >
            <View style={styles.rowContainer}>
                <Text style={styles.textItem}>{item.NARRATION}</Text>
                <Text style={styles.textItem}>{item.totalAmount.toLocaleString('en-IN', {
                    maximumFractionDigits: 2,
                    style: 'currency',
                    currency: 'INR'
                })}</Text>
            </View>
            <View style={styles.dateContainer}>
                <Text style={styles.textItem}>{item.DATE}</Text>
            </View>
        </TouchableOpacity>
    );

    if (vouchers.length > 0) { // Corrected rendering condition
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <FlatList
                        data={vouchers}
                        keyExtractor={(item) => item.GUID} // Corrected key extraction
                        renderItem={renderItem}
                    />
                </View>
            </View>
        );
    }
};



const styles = StyleSheet.create({
    rowContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textItem: {
        // marginRight: 40
        color: 'black'
    },
    textContainer: {
        // borderWidth: 5,
        // borderColor: 'red',
        marginTop: 20
    },
    mainList: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 14,
        borderBottomWidth: 1,
        borderColor: 'grey'

    },
    bottomList: {
        display: 'none',

    },
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#5605fd',
        padding: 10,
        // borderRadius: 5,
        // marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 16,
        // width: 3500,
        borderRadius: 10,
    },
    closeButton: {
        backgroundColor: '#5605fd',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3498db',
    },
});

export default SalesVouchersScreen;
