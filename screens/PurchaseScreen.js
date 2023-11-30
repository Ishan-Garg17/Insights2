// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// const PurchaseScreen = ({ route }) => {
//     // Your logic for PurchaseModal
//     const { navigate } = useNavigation()
//     const [purchaseData, setPurchaseData] = useState(route.params.data)

//     console.log("Purchase Screen", purchaseData, route.params);
//     return (
//         <View>
//             {purchaseData.map((ele) => (
//                 <TouchableOpacity style={styles.container} onPress={() => navigate('VoucherDetails', { details: ele.details })}>
//                     <View style={styles.subContainer}>
//                         <Text>{ele.VchNo}</Text>
//                         <Text>{ele.date}</Text>
//                     </View>
//                     <Text>{ele.details[0].Amount}</Text>
//                 </TouchableOpacity>
//             ))}

//             <Text>Purchase Modal</Text>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     subContainer: {
//         display: 'flex',
//         flexDirection: 'column', // Arrange children in a row

//     },
//     container: {
//         display: 'flex',
//         flexDirection: 'row', // Arrange children in a row
//         borderWidth: 1,          // Border width
//         borderColor: '#000',
//         alignItems: 'center', // Center items vertically
//         backgroundColor: 'white',
//         padding: 10,
//         margin: 10,
//         borderRadius: 5,
//         justifyContent: 'space-between',
//     },
//     textContainer: {
//         flex: 1, // Take as much space as available
//         alignItems: 'flex-start', // Align text to the start of the container (corner)
//     },
//     text: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: 'blue',
//     },
//     amountContainer: {
//         alignItems: 'flex-end', // Align amount to the end of the container (corner)
//     },
//     amount: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: 'blue',
//     },
// })




// export default PurchaseScreen;