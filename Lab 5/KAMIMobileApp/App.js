import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./src/Login";
import { AsyncStorage } from "react-native";
import AddService from "./src/AddService";
import DetailService from "./src/DetailService";
import ServiceList from "./src/Home";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UpdateService from "./src/UpdateService";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ServiceList">
        <Stack.Screen
          name="ServiceList"
          component={ServiceList}
          options={{ headerShown: false }}
        ></Stack.Screen>

        <Stack.Screen
          name="AddService"
          component={AddService}
          options={{
            title: "Service",
            headerStyle: { backgroundColor: "#F75A68" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 18,
            },
          }}
        />

        <Stack.Screen
          name="DetailService"
          component={DetailService}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />

        <Stack.Screen
          name="UpdateService"
          component={UpdateService}
          options={{ title: "Update" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
