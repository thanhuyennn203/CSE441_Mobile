import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { IconButton, Appbar, Card, Divider } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const TransactionDetail = ({ route, navigation }) => {
  const { id } = route.params;
  console.log(id);
  const [transaction, setTransaction] = useState({});

  const [token, setToken] = useState(null);

  // Load token from AsyncStorage on mount
  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem("token");
      setToken(savedToken);
    };
    loadToken();

    const url = `https://kami-backend-5rs0.onrender.com/transactions/${id}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((d) => {
        setTransaction(d);
        console.log(d);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [id]);

  // const Delete = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://kami-backend-5rs0.onrender.com/services/${id}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         // body: JSON.stringify({ name, price: Number(price) }),
  //       }
  //     );

  //     const data = await response.json();

  //     if (response.ok) {
  //       alert("Service deleted successfully!");
  //       navigation.navigate("ServiceList");
  //     } else {
  //       alert(data.message || "Failed to delete service");
  //     }
  //   } catch (error) {
  //     console.error("Error deleteting service:", error);
  //     alert("An error occurred");
  //   }
  // };

  const date = new Date(transaction.createdAt).toLocaleString("vi-VN");
  const services = transaction.services || [];
  const customerName = transaction.customer?.name || "";
  const totalPrice = services.reduce((sum, s) => sum + s.price * s.quantity, 0);
  const isCancelled =
    transaction.status === "cancelled" || transaction.status === "Cancelled";
  const discountAmount = transaction.priceBeforePromotion - transaction.price;
  return (
    <SafeAreaProvider>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction
          color="white"
          size={18}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content title="Details" titleStyle={styles.appbarTitle} />
        <Appbar.Action
          icon="delete"
          color="white"
          size={20}
          onPress={() => {
            // Alert.alert("Confirm", "Are you sure you want to remove this?", [
            //   { text: "Cancel", style: "cancel" },
            //   { text: "Delete", onPress: Delete },
            // ]);
          }}
          style={styles.delete}
        />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Card style={styles.card}>
            <Text style={styles.sectionTitle}>General information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Transaction code</Text>
              <Text style={styles.info}>{transaction.id}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Customer</Text>
              <Text style={styles.info}>{customerName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Creation time</Text>
              <Text style={styles.info}>{date}</Text>
            </View>
          </Card>

          <Card style={styles.card}>
            <Text style={styles.sectionTitle}>Services list</Text>

            {services.map((service, index) => (
              <View key={index} style={styles.serviceRow}>
                <Text>{service.name}</Text>
                <Text>x{service.quantity}&nbsp;&nbsp;</Text>
                <Text style={styles.info}>
                  {" "}
                  {service.price.toLocaleString("vi-VN")} đ
                </Text>
              </View>
            ))}

            <Divider style={{ marginVertical: 8 }} />

            <View style={styles.infoRow}>
              <Text style={styles.label}>Total</Text>
              <Text style={styles.info}>
                {services
                  .reduce((sum, s) => sum + s.price * s.quantity, 0)
                  .toLocaleString("vi-VN")}{" "}
                đ
              </Text>
            </View>
          </Card>

          <Card style={styles.card}>
            <Text style={styles.sectionTitle}>Cost</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Amount of money</Text>
              <Text style={styles.info}>
                {transaction.priceBeforePromotion} đ
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Discount</Text>
              <Text style={styles.info}>-{discountAmount} đ</Text>
            </View>
            <Divider style={{ marginVertical: 8 }} />
            <View style={styles.infoRow}>
              <Text style={styles.totalLabel}>Total payment</Text>
              <Text style={styles.totalAmount}>{totalPrice} đ</Text>
            </View>
            {isCancelled && (
              <View style={styles.cancelledRow}>
                <Text style={styles.cancelledText}>
                  This order was cancelled
                </Text>
              </View>
            )}
          </Card>
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
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#d60000",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  label: {
    fontSize: 14,
    color: "#8c7d7d",
    fontWeight: "bold",
    marginBottom: 6,
  },
  info: {
    fontWeight: "bold",
  },
  totalLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  totalAmount: {
    fontWeight: "bold",
    fontSize: 16,
    color: "red",
  },
  cancelledRow: {
    marginTop: 8,
    backgroundColor: "#ffe5e5",
    padding: 8,
    borderRadius: 6,
  },
  cancelledText: {
    color: "red",
    fontWeight: "bold",
    textAlign: "right",
  },
});

export default TransactionDetail;
