import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-native-paper";
import LoginScreen from "./src/Login";
import AddService from "./src/AddService";
import DetailService from "./src/DetailService";
import ServiceList from "./src/Home";
import UpdateService from "./src/UpdateService";
import Setting from "./src/Setting";
import Customer from "./src/Customer";
import AddCustomer from "./src/AddCustomer";
import Transaction from "./src/Transaction";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TransactionDetail from "./src/TransactionDetail";
import CustomerDetail from "./src/CustomerDetail";
import EditCustomer from "./src/EditCustomer";
import AddTransaction from "./src/AddTransaction";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tabs
function MainTabs() {
  return (
    <Provider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") iconName = "home";
            else if (route.name === "Transaction") iconName = "cash-register";
            else if (route.name === "Customer") iconName = "account-group";
            else if (route.name === "Setting") iconName = "cog";

            return (
              <MaterialCommunityIcons
                name={iconName}
                color={color}
                size={size}
              />
            );
          },
        })}
      >
        <Tab.Screen name="Home" component={ServiceList} />
        <Tab.Screen name="Transaction" component={Transaction} />
        <Tab.Screen name="Customer" component={Customer} />
        <Tab.Screen name="Setting" component={Setting} />
      </Tab.Navigator>
    </Provider>
  );
}

// Root App Navigator
export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainTabs">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailService"
            component={DetailService}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddCustomer"
            component={AddCustomer}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="AddService"
            component={AddService}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Transaction"
            component={Transaction}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="UpdateService"
            component={UpdateService}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TransactionDetail"
            component={TransactionDetail}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="CustomerDetail"
            component={CustomerDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditCustomer"
            component={EditCustomer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddTransaction"
            component={AddTransaction}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
