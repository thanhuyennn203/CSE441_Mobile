import "react-native-gesture-handler";
import React from "react";
import Contacts from "./src/Contact";
import Store from "./src/Store";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileContact from "./src/ProfileContact";
import Favorites from "./src/Favorites";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createStackNavigator();

function ContactsScreens() {
  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name="Contacts"
        component={Contacts}
        options={{ title: "Contacts" }}
      />
      <Stack.Screen
        name="ProfileContact"
        component={ProfileContact}
        options={{ title: "Profile contact" }}
      />
    </Stack.Navigator>
  );
}

function FavoriteScreens() {
  return (
    <Stack.Navigator
      initialRouteName="Favorites"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{ title: "Favorites" }}
      />
      <Stack.Screen
        name="ProfileContact"
        component={ProfileContact}
        options={{ title: "Profile contact" }}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Contacts"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Contacts") {
            iconName = "format-list-bulleted";
          } else if (route.name === "Favorites") {
            iconName = "star-check";
          }
          return (
            <MaterialCommunityIcons name={iconName} color={color} size={size} />
          );
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Contacts" component={ContactsScreens} />
      <Tab.Screen name="Favorites" component={FavoriteScreens} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  );
}
