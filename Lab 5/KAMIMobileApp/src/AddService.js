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

const AddService = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [token, setToken] = useState(null);

  // Load token from AsyncStorage on mount
  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem("token");
      setToken(savedToken);
    };
    loadToken();
  }, []);

  const Add = async () => {
    if (!name || !price) {
      alert("Please enter both name and price");
      return;
    }

    try {
      const response = await fetch(
        "https://kami-backend-5rs0.onrender.com/services",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, price: Number(price) }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Service added successfully!");
        setName("");
        setPrice("");
      } else {
        alert(data.message || "Failed to add service");
      }
    } catch (error) {
      console.error("Error adding service:", error);
      alert("An error occurred");
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.lable}>Service name*</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter service name"
        />

        <Text style={styles.lable}>Price*</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Enter price"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={Add}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
};

export default AddService;

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
