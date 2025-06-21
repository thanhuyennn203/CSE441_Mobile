import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Appbar } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const formatMoney = (money) => money.toLocaleString("vi-VN") + " ₫";

const Transaction = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const url = "https://kami-backend-5rs0.onrender.com/transactions";

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((d) => {
        setTransactions(d);
        // console.log(d);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [transactions]);

  const renderItem = ({ item }) => {
    const id = item.id || item._id;
    const date = new Date(item.createdAt).toLocaleString("vi-VN");
    const services = item.services || [];
    const customerName = item.customer?.name || "";
    const totalPrice = services.reduce(
      (sum, s) => sum + s.price * s.quantity,
      0
    );
    const isCancelled =
      item.status === "cancelled" || item.status === "Cancelled";

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("TransactionDetail", { id: item._id })
        }
        style={[styles.card, isCancelled && styles.cancelledCard]}
      >
        <View style={styles.headerRow}>
          <Text style={styles.transactionId}>{id}</Text>
          <Text style={styles.date}>{date}</Text>
          {isCancelled && (
            <Text style={styles.cancelledText}> - Cancelled</Text>
          )}
        </View>

        <View style={styles.serviceList}>
          {services.map((s, index) => (
            <Text key={index} style={styles.serviceItem}>
              - {s.name}
            </Text>
          ))}
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.customerName}>Customer: {customerName}</Text>
          <Text style={styles.price}>{formatMoney(totalPrice)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider>
      <View style={styles.wrapper}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.Content title="Transaction" titleStyle={styles.appbarTitle} />
        </Appbar.Header>

        <FlatList
          data={transactions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.container}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        />

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate("AddTransaction")}
        >
          <Icon name="plus" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  appbar: {
    backgroundColor: "#F75A68",
  },
  appbarTitle: {
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    padding: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 16,
  },
  label: {
    fontSize: 14,
    color: "#8c7d7d",
    fontWeight: "bold",
    marginBottom: 6,
  },
  addBtn: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#F75A68",
    borderRadius: 28,
    padding: 10,
    elevation: 6,
  },
  transactionId: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 14,
  },
  date: {
    marginLeft: 8,
    color: "#888",
    fontSize: 13,
  },
  cancelledText: {
    color: "#F75A68",
    fontWeight: "bold",
    fontSize: 13,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  serviceList: {
    marginBottom: 8,
  },
  serviceItem: {
    fontSize: 14,
    color: "#444",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  customerName: {
    fontSize: 13,
    color: "#8c7d7d",
    fontWeight: "700",
  },
  price: {
    color: "#F75A68",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelledCard: {
    borderColor: "#F75A68",
  },
});
