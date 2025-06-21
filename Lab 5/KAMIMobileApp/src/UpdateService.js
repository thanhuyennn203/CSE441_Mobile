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

const UpdateService = ({ route, navigation }) => {
  const { item } = route.params;
  const id = item._id;
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [token, setToken] = useState(null);

  // Load token from AsyncStorage on mount
  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem("token");
      setToken(savedToken);
    };
    loadToken();
  }, [item]);

  const Update = async () => {
    if (!name || !price) {
      alert("Please enter both name and price");
      return;
    }

    try {
      const response = await fetch(
        `https://kami-backend-5rs0.onrender.com/services/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, price: Number(price) }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Service updated successfully!");
        item.name = name;
        item.price = price;
        setName("");
        setPrice("");
        navigation.navigate("DetailService", { service: item });
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
      <View style={styles.container}>
        <Text style={styles.lable}>Service name*</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.lable}>Price*</Text>
        <TextInput
          style={styles.input}
          value={price?.toString()}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={Update}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
};

export default UpdateService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
  },
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
