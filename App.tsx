import React, {useLayoutEffect} from 'react'
import {KeyboardAvoidingView, Platform} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from './screens/HomeScreen'
import DetailsScreen from './screens/DetailsScreen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {SafeAreaView} from 'react-native-safe-area-context'
import {checkData, createTable, fetchDataFromBackend} from './DatabaseConfig'
import PurchaseVouchersScreen from './screens/PurchaseVouchersScreen'
import PurchaseVoucherDetails from './screens/PurchaseVoucherDetails'
import LoadingScreen from './screens/LoadingScreen'
import SalesVouchersScreen from './screens/SalesVoucherScreen'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const HomeStack: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Loader"
      component={LoadingScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    <Stack.Screen name="PurchaseScreen" component={PurchaseVouchersScreen} />
    <Stack.Screen
      name="PurchaseVoucherDetailsScreen"
      component={PurchaseVoucherDetails}
    />
    <Stack.Screen name="SalesScreen" component={SalesVouchersScreen} />
  </Stack.Navigator>
)

const TeamsStack: React.FC = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Teams" component={HomeScreen} />
  </Stack.Navigator>
)

const InventoryStack: React.FC = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Inventory" component={HomeScreen} />
  </Stack.Navigator>
)

const SupportStack: React.FC = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Support" component={HomeScreen} />
  </Stack.Navigator>
)

const App: React.FC = () => {
  useLayoutEffect(() => {
    createTable()
    checkData()
  }, [])

  return (
    <NavigationContainer>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Platform.OS === 'android' ? 'white' : '',
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}
          // keyboardVerticalOffset={Platform.select({ios: 0, android: 10})}
          enabled>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({color, size}) => {
                let iconName

                if (route.name === 'Dashboard') {
                  iconName = 'view-dashboard'
                } else if (route.name === 'Teams') {
                  iconName = 'account-group'
                } else if (route.name === 'Inventory') {
                  iconName = 'package'
                } else if (route.name === 'Support') {
                  iconName = 'headset'
                }

                return iconName ? (
                  <MaterialCommunityIcons
                    name={iconName as string}
                    size={size}
                    color={color}
                  />
                ) : null
              },
            })}
            // screenListeners={{
            //   activeTintColor: '#5605fd',
            //   inactiveTintColor: 'gray',
            // }}
          >
            <Tab.Screen
              name="Dashboard"
              component={HomeStack}
              options={{headerShown: false}}
            />
            <Tab.Screen
              name="Teams"
              component={TeamsStack}
              options={{headerShown: false}}
            />
            <Tab.Screen
              name="Inventory"
              component={InventoryStack}
              options={{headerShown: false}}
            />
            <Tab.Screen
              name="Support"
              component={SupportStack}
              options={{headerShown: false}}
            />
          </Tab.Navigator>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </NavigationContainer>
  )
}

export default App
