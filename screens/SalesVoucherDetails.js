import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Press } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import { getSalesItems } from '../DatabaseConfig';

const SalesVoucherDetails = ({ navigation }) => {
    const [saleItems, setSaleItems] = useState([]); // Corrected state initialization
    const route = useRoute();
    const { voucher } = route.params;
    console.log("The voucher details screen is", voucher);
    React.useLayoutEffect(() => {
        getSalesItems(voucher.voucherID, setSaleItems)
    }, [navigation]);
    console.log("sale items are", saleItems);
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={{ margin: 15 }}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-back" size={25} color="white" />
                </TouchableOpacity>
                <View style={{}}>
                    <Text style={styles.headerText}>Voucher No. {voucher.VOUCHERNUMBER}</Text>
                    <Text style={styles.headerText}>Sales</Text>
                    <Text style={styles.headerText}>{voucher.PARTYNAME}</Text>
                    <Text style={styles.headerText}>Rs. {voucher.totalAmount}</Text>
                </View>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={{ flexDirection: 'column', backgroundColor: 'white', padding: 10 }}>
                    <Text style={{ color: 'black', fontSize: 22, fontWeight: 500, borderBottomWidth: 0.5, borderBottomColor: '#dadada' }}>Details</Text>
                    <TouchableOpacity>
                        <Text style={{ color: 'black', margin: 2 }}>Lorem Ipsum donor sjoidshwd joiwedhoiwe ehijwoeihw</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'column', backgroundColor: 'white', padding: 10, marginTop: 30 }}>
                    <Text style={{ color: 'black', fontSize: 22, fontWeight: 500, borderBottomWidth: 0.5, borderBottomColor: '#dadada' }}>Items</Text>
                    {saleItems.map((item) => (
                        <>
                            <TouchableOpacity style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'black', margin: 2 }}>{item.STOCKITEM}</Text>
                                <Text style={{ color: 'black', margin: 2 }}>{item.AMOUNT}</Text>
                            </TouchableOpacity>
                            <Text style={{ color: 'black', borderBottomWidth: 0.5, borderBottomColor: '#dadada' }}></Text>
                        </>
                    ))}

                    <TouchableOpacity style={{ paddingTop: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'black', margin: 2 }}>IGST (SALE)</Text>
                        <Text style={{ color: 'black', margin: 2 }}>{voucher.IGSTSALE}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'black', borderBottomWidth: 0.5, borderBottomColor: '#dadada' }}></Text>

                    <TouchableOpacity style={{ paddingTop: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'blue', margin: 2 }}>Gross Total</Text>
                        <Text style={{ color: 'black', margin: 2 }}>{voucher.totalAmount}</Text>
                    </TouchableOpacity>
                </View>


                <View style={{ flexDirection: 'column', backgroundColor: 'white', padding: 10, marginTop: 30 }}>
                    <Text style={{ padding: 10, color: 'black', fontSize: 22, fontWeight: 500, borderBottomWidth: 0.5, borderBottomColor: '#dadada' }}>NARRATION</Text>
                    <TouchableOpacity style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'black', margin: 2 }}>{voucher.NARRATION}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'black', borderBottomWidth: 0.5, borderBottomColor: '#dadada' }}></Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#5605fd',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        zIndex: 1, // Ensure the header stays above the ScrollView
    },
    headerText: {
        color: 'white',
        fontWeight: '500',
        marginTop: 10,
        fontSize: 16,
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#ebebeb',
        zIndex: 0, // Keep the ScrollView behind the header
    }
});

export default SalesVoucherDetails;

