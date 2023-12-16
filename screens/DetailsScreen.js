import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import CalendarPicker from 'react-native-calendar-picker';

import { useRoute } from '@react-navigation/native';

import Modal from 'react-native-modal';
import { getTotalPurchaseAmount, getTotalSalesAmount } from '../DatabaseConfig';

// import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
const DetailsScreen = ({ navigation }) => {

    const [selectedItems, setSelectedItems] = useState([]);
    const [isExpanded, setExpanded] = useState(false);

    const handleToggle = () => {
        setExpanded(!isExpanded);
    };


    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [purchaseAmount, setPurchaseAmount] = useState(null);
    const [salesAmount, setSalesAmount] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    if (selectedStartDate) {
        console.log("Dates Selected are", selectedStartDate, selectedEndDate, selectedStartDate.toString());

    }
    const onDateChange = (date, type) => {
        if (type === 'END_DATE') {
            setSelectedEndDate(date);
        } else {
            setSelectedStartDate(date);
            setSelectedEndDate(date); // Set the end date to the same as the start date initially
        }
    };
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const route = useRoute();

    const { someKey } = route.params;

    console.log("navigation data ius", someKey);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: `${someKey.name}`,
            headerStyle: {
                backgroundColor: '#5605fd',
            },
            headerTintColor: 'white',
            headerRight: () => (
                <View style={{ flexDirection: 'row', marginRight: 4 }}>
                    <TouchableOpacity
                        onPress={() => {
                            // Handle details icon press
                        }}
                    >
                        <Icon name="information-circle-outline" size={20} color="white" />
                    </TouchableOpacity>

                    {/* Call Icon */}
                    <TouchableOpacity
                        style={{ marginLeft: 15, marginRight: 15 }}
                        onPress={() => {
                            // Handle call icon press
                        }}
                    >
                        <Icon name="call-outline" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            ),
            // You can add more options as needed
        });

    }, [navigation]);

    React.useLayoutEffect(() => {
        getTotalPurchaseAmount(someKey.id, setPurchaseAmount)
        getTotalSalesAmount(someKey.id, setSalesAmount)

    }, [navigation]);

    console.log("purhcase amount is", purchaseAmount);
    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Select Date Range</Text> */}
            <TouchableOpacity onPress={toggleModal} style={styles.button}>
                <Text style={styles.buttonText}>Open Calendar</Text>
            </TouchableOpacity>
            {purchaseAmount && (
                <View style={styles.textContainer}>
                    <TouchableOpacity style={styles.mainList} onPress={handleToggle}>
                        <Text style={{ color: 'black', fontWeight: 300 }}>Overview</Text>
                        <Icon name={isExpanded ? 'remove-circle' : 'add-circle'} size={24} color="#c4c4c4" />
                    </TouchableOpacity>
                    <View style={[styles.bottomList, isExpanded && { display: 'block' }]}>
                        <View style={styles.mainList}>
                            <Text style={{ color: 'black', fontWeight: 300 }}>Last Purchase Date</Text>
                        </View>
                        <View style={styles.mainList} >
                            <Text style={{ color: 'black', fontWeight: 300 }}>Last Payment Date</Text>
                        </View>
                        <View style={styles.mainList} >
                            <Text style={{ color: 'black', fontWeight: 300 }}>No of Purchase Invoices</Text>
                        </View>
                        <View style={styles.mainList}>
                            <Text style={{ color: 'black', fontWeight: 300 }}>Avg Purchase Invoice Amt</Text>
                        </View>
                    </View>
                    <View style={[styles.textContainer, { marginTop: 20 }]}>
                        <TouchableOpacity style={styles.mainList}
                            onPress={() => navigation.navigate('PurchaseScreen', { someKey: someKey })}
                        >
                            <Text>PurchaseVouchers </Text>
                            <Text style={{ color: 'black', fontWeight: 500 }}>{purchaseAmount.toLocaleString('en-IN', {
                                maximumFractionDigits: 2,
                                style: 'currency',
                                currency: 'INR'
                            })} </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {salesAmount && (
                <View style={styles.textContainer}>
                    <TouchableOpacity style={styles.mainList} onPress={handleToggle}>
                        <Text style={{ color: 'black', fontWeight: 300 }}>Overview</Text>
                        <Icon name={isExpanded ? 'remove-circle' : 'add-circle'} size={24} color="#c4c4c4" />
                    </TouchableOpacity>
                    <View style={[styles.bottomList, isExpanded && { display: 'block' }]}>
                        <View style={styles.mainList}>
                            <Text style={{ color: 'black', fontWeight: 300 }}>Last Purchase Date</Text>
                        </View>
                        <View style={styles.mainList} >
                            <Text style={{ color: 'black', fontWeight: 300 }}>Last Payment Date</Text>
                        </View>
                        <View style={styles.mainList} >
                            <Text style={{ color: 'black', fontWeight: 300 }}>No of Purchase Invoices</Text>
                        </View>
                        <View style={styles.mainList}>
                            <Text style={{ color: 'black', fontWeight: 300 }}>Avg Purchase Invoice Amt</Text>
                        </View>
                    </View>
                    <View style={[styles.textContainer, { marginTop: 20 }]}>
                        <TouchableOpacity style={styles.mainList}
                            onPress={() => navigation.navigate('PurchaseScreen', { someKey: someKey })}
                        >
                            <Text>SalesVouchers </Text>
                            <Text style={{ color: 'black', fontWeight: 500 }}>{salesAmount.toLocaleString('en-IN', {
                                maximumFractionDigits: 2,
                                style: 'currency',
                                currency: 'INR'
                            })} </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown">
                <View style={styles.modalContainer}>
                    <CalendarPicker
                        startFromMonday={true}
                        allowRangeSelection={true}
                        selectedStartDate={selectedStartDate}
                        selectedEndDate={selectedEndDate}
                        onDateChange={onDateChange}
                        selectedDayColor="#5605fd"
                        selectedDayTextColor="white"
                        width={370}
                        height={400}
                    />
                    <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

        </View>

    );
};
const styles = StyleSheet.create({
    textContainer: {
        // borderWidth: 5,
        // borderColor: 'red',
        marginTop: 20
    },
    mainList: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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

export default DetailsScreen;
