import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Press } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

const PurchaseVoucherDetails = ({ navigation }) => {
    const [vouchers, setVouchers] = useState([]); // Corrected state initialization
    const route = useRoute();
    const { voucher } = route.params;
    console.log("The voucher details screen is", voucher);

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
                    <Text style={styles.headerText}>Purchase</Text>
                    <Text style={styles.headerText}>{voucher.PARTYLEDGERNAME}</Text>
                    <Text style={styles.headerText}>Rs. {voucher.TOTALAMOUNT}</Text>
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
                    <Text style={{ color: 'black', fontSize: 22, fontWeight: 500, borderBottomWidth: 0.5, borderBottomColor: '#dadada' }}>Summary</Text>
                    <TouchableOpacity style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'black', margin: 2 }}>PURCHASE LOCAL</Text>
                        <Text style={{ color: 'black', margin: 2 }}>{voucher.PURCHASELOCAL}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'black', borderBottomWidth: 0.5, borderBottomColor: '#dadada' }}></Text>
                    <TouchableOpacity style={{ paddingTop: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'black', margin: 2 }}>CGST (PUR)</Text>
                        <Text style={{ color: 'black', margin: 2 }}>{voucher.CGST}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'black', borderBottomWidth: 0.5, borderBottomColor: '#dadada' }}></Text>
                    <TouchableOpacity style={{ paddingTop: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'black', margin: 2 }}>SGST (PUR)</Text>
                        <Text style={{ color: 'black', margin: 2 }}>{voucher.SGST}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'black', borderBottomWidth: 0.5, borderBottomColor: '#dadada' }}></Text>
                    <TouchableOpacity style={{ paddingTop: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'black', margin: 2 }}>SHORT & EXCESS</Text>
                        <Text style={{ color: 'black', margin: 2 }}>SS</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'black', borderBottomWidth: 0.5, borderBottomColor: '#dadada' }}></Text>
                    <TouchableOpacity style={{ paddingTop: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'blue', margin: 2 }}>Gross Total</Text>
                        <Text style={{ color: 'black', margin: 2 }}>{voucher.TOTALAMOUNT}</Text>
                    </TouchableOpacity>
                </View>


                <View style={{ flexDirection: 'column', backgroundColor: 'white', padding: 10, marginTop: 30 }}>
                    <Text style={{ padding: 10, color: 'black', fontSize: 22, fontWeight: 500, borderBottomWidth: 0.5, borderBottomColor: '#dadada' }}>NARRATION</Text>
                    <TouchableOpacity style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        {/* <Text style={{ color: 'black', margin: 2 }}>PURCHASE LOCAL</Text> */}
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

export default PurchaseVoucherDetails;

