import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { IconButton } from "react-native-paper";
import React, { useState, useEffect } from "react";

const DetailService = ({ route, navigation }) => {
  const { service } = route.params;
  const id = service._id;
  const name = service.name;
  const price = service.price;
  const [token, setToken] = useState(null);

  // Load token from AsyncStorage on mount
  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem("token");
      setToken(savedToken);
    };
    loadToken();
  }, []);

  const Delete = async () => {
    try {
      const response = await fetch(
        `https://kami-backend-5rs0.onrender.com/services/${service._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id, name, price: Number(price) }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Service deleted successfully!");
      } else {
        alert(data.message || "Failed to delete service");
      }
    } catch (error) {
      console.error("Error deleteting service:", error);
      alert("An error occurred");
    }
  };
  // console.log({ service });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Service detail</Text>
        <IconButton
          icon="dots-vertical"
          size={24}
          iconColor="white"
          onPress={() => {
            Alert.alert("Confirm", "Are you sure you want to remove this?", [
              { text: "Cancel", style: "cancel" },
              { text: "Delete", onPress: Delete },
            ]);
          }}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.content}>
          <Text style={styles.bold}>Service name:</Text>
          {service.name}
        </Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>Price:</Text>
          {service.price} ₫
        </Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>Creator:</Text> {service.createdBy}
        </Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>Time:</Text> {service.createdAt}
        </Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>Final update:</Text> {service.updatedAt}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("UpdateService", { item: service })
          }
        >
          <Text style={styles.buttonText}>Update Service</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: "#F75A68",
    paddingBottom: 10,
    paddingTop: 50,
    paddingLeft: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: { color: "#fff", fontSize: 18, fontWeight: 600 },
  body: { padding: 20 },
  content: {
    marginBottom: 10,
  },
  bold: { fontWeight: "bold" },
  button: {
    backgroundColor: "#F75A68",
    borderRadius: 30,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default DetailService;
