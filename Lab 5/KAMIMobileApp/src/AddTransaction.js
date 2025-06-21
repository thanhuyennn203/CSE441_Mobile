import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Appbar, Button, IconButton } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddTransactionScreen = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    fetchServices();
    fetchCustomers();
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem("token");
      setToken(savedToken);
    };
    loadToken();
  }, []);

  const fetchServices = () => {
    const url = "https://kami-backend-5rs0.onrender.com/services";
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((d) => {
        setServices(d);
        // console.log(d);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const fetchCustomers = () => {
    const url = "https://kami-backend-5rs0.onrender.com/customers";
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((d) => {
        setCustomers(d);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const handleSubmit = async () => {
    if (!selectedCustomer || Object.keys(selectedServices).length === 0) {
      alert("Please select a customer and at least one service.");
      return;
    }
    const body = {
      customerId: selectedCustomer,
      services: Object.entries(selectedServices).map(([id, val]) => ({
        _id: id,
        quantity: val.quantity,
        userID: val.executor,
      })),
    };

    try {
      const response = await fetch(
        "https://kami-backend-5rs0.onrender.com/transactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Transaction added successfully!");
        navigation.goBack();
      } else {
        alert(data.message || "Failed to add transaction");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  };
  const executorsFromServices = Array.from(
    new Set(services.map((s) => s.createdBy))
  ).map((id) => ({
    label: id,
    value: id,
  }));

  const customersListName = customers.map((cust) => ({
    label: cust.name,
    value: cust._id,
  }));

  const mockExecutors = Array.from(
    new Set(services.map((s) => s.createdBy))
  ).map((id) => ({
    label: id,
    value: id,
  }));

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedServices, setSelectedServices] = useState({});

  console.log(selectedServices);
  const toggleService = (serviceId) => {
    setSelectedServices((prev) => {
      const copy = { ...prev };
      if (copy[serviceId]) delete copy[serviceId];
      else copy[serviceId] = { quantity: 1, executor: null };
      return copy;
    });
  };

  const updateQuantity = (id, delta) => {
    setSelectedServices((prev) => {
      const updated = { ...prev };
      const newQty = Math.max(1, (updated[id]?.quantity || 1) + delta);
      updated[id].quantity = newQty;
      return updated;
    });
  };

  const updateExecutor = (id, executor) => {
    setSelectedServices((prev) => {
      const updated = { ...prev };
      updated[id].executor = executor;
      return updated;
    });
  };

  const totalPrice = Object.entries(selectedServices).reduce(
    (sum, [id, val]) => {
      const service = services.find((s) => s._id === id);
      return sum + (service?.price || 0) * val.quantity;
    },
    0
  );

  //   console.log("services: ", services);

  return (
    <SafeAreaProvider>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Transaction" titleStyle={styles.title} />
      </Appbar.Header>

      <ScrollView style={styles.container}>
        <Text style={styles.label}>Select Customer</Text>
        <Dropdown
          data={customersListName}
          labelField="label"
          valueField="value"
          value={selectedCustomer}
          placeholder="Choose a customer"
          style={styles.dropdown}
          onChange={(item) => setSelectedCustomer(item.value)}
        />

        <Text style={styles.label}>Select Services</Text>
        {services.map((service) => {
          const selected = selectedServices[service._id];
          return (
            <View key={service._id} style={styles.serviceItem}>
              <BouncyCheckbox
                size={24}
                fillColor="#F75A68"
                unfillColor="#FFF"
                text={service.name}
                isChecked={!!selected}
                onPress={() => toggleService(service._id)}
              />

              {selected && (
                <View style={styles.serviceDetails}>
                  <View style={styles.row}>
                    <IconButton
                      icon="minus"
                      onPress={() => updateQuantity(service._id, -1)}
                    />
                    <Text style={styles.qtyText}>{selected.quantity}</Text>
                    <IconButton
                      icon="plus"
                      onPress={() => updateQuantity(service._id, 1)}
                    />
                  </View>

                  <Text style={{ marginBottom: 5 }}>Select Executor:</Text>
                  <Dropdown
                    data={mockExecutors}
                    labelField="label"
                    valueField="value"
                    value={selected.executor}
                    placeholder="Choose executor"
                    style={styles.dropdownSmall}
                    onChange={(item) => updateExecutor(service._id, item.value)}
                  />

                  <Text style={styles.priceText}>
                    Total:{" "}
                    {(service.price * selected.quantity).toLocaleString(
                      "vi-VN"
                    )}{" "}
                    đ
                  </Text>
                </View>
              )}
            </View>
          );
        })}

        <Button
          mode="contained"
          style={styles.submitBtn}
          onPress={handleSubmit}
        >
          See summary: ({totalPrice.toLocaleString("vi-VN")} đ)
        </Button>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default AddTransactionScreen;

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: "#F75A68",
  },
  title: {
    color: "white",
    fontWeight: "bold",
  },
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontWeight: "bold",
    marginVertical: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
    marginBottom: 20,
  },
  dropdownSmall: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 10,
  },
  serviceItem: {
    marginBottom: 20,
  },
  serviceDetails: {
    marginLeft: 30,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  priceText: {
    fontWeight: "bold",
    color: "#d60000",
    marginTop: 5,
  },
  submitBtn: {
    marginTop: 30,
    borderRadius: 30,
    backgroundColor: "#F75A68",
  },
});
