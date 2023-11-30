import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function DetailsScreen({ route }) {
    const [data, setData] = useState([])
    const [payment, setPaymentAmount] = useState(0)
    const { navigate } = useNavigation()
    useEffect(() => {
        // console.log(route.params.item.$Name);
        const key = route.params.item.$Name;
        const apiUrl = 'http://192.168.29.3:4000/voucherDetails';
        const queryParams = { key: key };

        // Create a URLSearchParams object and append the query parameters
        const searchParams = new URLSearchParams(queryParams);

        // Combine the base URL with the query parameters
        const apiUrlWithQuery = `${apiUrl}?${searchParams}`;
        console.log(apiUrlWithQuery);
        fetch(apiUrlWithQuery)
            .then(response => response.json()).then(data => {
                // console.log('Response from server:', data);
                const mainData = data.document.value;
                setData(mainData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        return () => {
            console.log("Effect cleared");
        };
    }, []);
    console.log("Data Received is", data);
    return (
        <View>
            <TouchableOpacity style={styles.detailsTab} onPress={() => navigate('PurchaseScreen', { data: data.Purchase, setAmount: setPaymentAmount })}>
                <Text style={styles.text}>Purchase</Text>
                <Text style={styles.amount}>Rs 50</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('PaymentScreen')}>
                <Text>Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Payable</Text>
            </TouchableOpacity>

        </View >
    );
}

const styles = StyleSheet.create({
    detailsTab: {
        display: 'flex',
        flexDirection: 'row', // Arrange children in a row
        borderWidth: 1,          // Border width
        borderColor: '#000',
        alignItems: 'center', // Center items vertically
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        justifyContent: 'space-between',
    },
    textContainer: {
        flex: 1, // Take as much space as available
        alignItems: 'flex-start', // Align text to the start of the container (corner)
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'blue',
    },
    amountContainer: {
        alignItems: 'flex-end', // Align amount to the end of the container (corner)
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'blue',
    },
})

export default DetailsScreen;