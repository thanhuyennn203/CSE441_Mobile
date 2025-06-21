import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar } from "react-native-paper";

const EditCustomer = ({ route, navigation }) => {
  const customerInfo = route.params;
  const [name, setName] = useState(customerInfo.name);
  const [phone, setPhone] = useState(customerInfo.phone);
  const id = customerInfo.id;
  const [token, setToken] = useState(null);

  // Load token from AsyncStorage on mount
  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem("token");
      setToken(savedToken);
    };
    loadToken();
  }, []);

  const Edit = async () => {
    if (!name || !phone) {
      alert("Please enter both name and price");
      return;
    }

    try {
      const response = await fetch(
        `https://kami-backend-5rs0.onrender.com/Customers/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, phone }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Service updated successfully!");
        setName("");
        setPhone("");
        navigation.navigate("CustomerDetail", { _id: id });
      } else {
        alert(data.message || "Failed to update service");
      }
    } catch (error) {
      console.error("Error updating service:", error);
      alert("An error occurred");
    }
  };

  return (
    <SafeAreaProvider>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction
          color="white"
          size={18}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content title="Edit Customer" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <View style={styles.container}>
        <Text style={styles.lable}>Customer name*</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter customer name"
        />

        <Text style={styles.lable}>Phone*</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter phone"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={Edit}>
          <Text style={styles.buttonText}>Save changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
};

export default EditCustomer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  appbar: {
    backgroundColor: "#F75A68",
    zIndex: 10,
    elevation: 4,
    position: "relative",
  },
  appbarTitle: { color: "white", fontWeight: "bold" },
  lable: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "#F75A68",
    borderRadius: 30,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});
