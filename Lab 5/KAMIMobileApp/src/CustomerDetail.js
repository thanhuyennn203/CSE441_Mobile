import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Appbar, Card, Menu } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomerDetail = ({ route, navigation }) => {
  const { _id } = route.params;
  console.log(_id);
  const [customer, setCustomer] = useState({});

  const [token, setToken] = useState(null);

  // Load token from AsyncStorage on mount
  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem("token");
      setToken(savedToken);
    };
    loadToken();
    loadCustomer();
  }, [_id]);
  //   console.log(token);

  const loadCustomer = () => {
    const url = `https://kami-backend-5rs0.onrender.com/Customers/${_id}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((d) => {
        setCustomer(d);
        // console.log(d);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const Delete = async () => {
    try {
      const response = await fetch(
        `https://kami-backend-5rs0.onrender.com/Customers/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Customer deleted successfully!");
        navigation.navigate("MainTabs", { screen: "Customer" });
      } else {
        alert(data.message || "Failed to delete customer");
      }
    } catch (error) {
      console.error("Error deleteting customer:", error);
      alert("An error occurred");
    }
  };

  const transactions = customer.transactions || [];
  return (
    <SafeAreaProvider>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction
          color="white"
          size={18}
          onPress={() =>
            navigation.navigate("MainTabs", { screen: "Customer" })
          }
        />
        <Appbar.Content title="Details" titleStyle={styles.appbarTitle} />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              color="white"
              onPress={openMenu}
            />
          }
        >
          <Menu.Item
            onPress={() => {
              closeMenu();
              navigation.navigate("EditCustomer", {
                name: customer.name,
                phone: customer.phone,
                id: customer._id,
              });
            }}
            title="Edit"
            leadingIcon="pencil"
          />
          <Menu.Item
            onPress={() => {
              closeMenu();
              Alert.alert(
                "Confirm Delete",
                "Are you sure you want to delete this client? This will not be possible to return",
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Delete",
                    onPress: () => Delete(),
                    style: "destructive",
                  },
                ]
              );
            }}
            title="Delete"
            leadingIcon="delete"
          />
        </Menu>
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Card style={styles.card}>
            <Text style={styles.sectionTitle}>General information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.info}>{customer?.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.info}>{customer?.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Total Spent</Text>
              <Text style={styles.info}>{customer?.totalSpent}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Loyalty</Text>
              <Text style={styles.info}>{customer?.loyalty}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Last update</Text>
              <Text style={styles.info}>{customer?.updatedBy}</Text>
            </View>
          </Card>

          <View style={styles.historyWrapper}>
            <Text style={styles.serviceTitle}>Transaction History</Text>

            {transactions.map((transaction, index) => (
              <Card key={index} style={styles.cardHistory}>
                <View style={styles.serviceRow}>
                  <Text style={{ fontWeight: "bold" }}>
                    {transaction.id} - {transaction?.createdAt}
                  </Text>

                  {transaction.services.map((service, i) => (
                    <Text key={i}>- {service?.name}</Text>
                  ))}
                </View>

                <View style={styles.priceContainer}>
                  <Text style={styles.priceText}>
                    {transaction?.price.toLocaleString("vi-VN")} đ
                  </Text>
                </View>
              </Card>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: "#F75A68",
    zIndex: 10,
    elevation: 4,
  },
  appbarTitle: { color: "white", fontWeight: "bold", textAlign: "left" },
  delete: {
    marginLeft: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    padding: 10,
  },
  card: {
    padding: 15,
    // marginBottom: 12,
    borderRadius: 12,
    marginHorizontal: 12,
    marginTop: 10,
  },
  cardHistory: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 12,
    marginTop: 10,
    borderColor: "#ccc",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#d60000",
    marginBottom: 12,
  },
  historyWrapper: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 5,
  },
  serviceTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#d60000",
    paddingLeft: 20,
    paddingTop: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  serviceRow: {},
  label: {
    fontSize: 14,
    color: "#8c7d7d",
    fontWeight: "bold",
    marginBottom: 6,
  },
  info: {
    fontWeight: "bold",
  },
  priceContainer: {
    paddingLeft: 12,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  priceText: {
    color: "#F75A68",
    fontWeight: "bold",
  },
});

export default CustomerDetail;
