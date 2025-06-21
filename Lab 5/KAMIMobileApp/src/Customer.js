import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Appbar, Card } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const formatMoney = (money) => money.toLocaleString("vi-VN") + " ₫";

const Customer = ({ navigation }) => {
  const [customers, setCustomers] = useState([]);
  const url = "https://kami-backend-5rs0.onrender.com/customers";

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((d) => {
        setCustomers(d);
        // console.log(d);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [customers]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.push("CustomerDetail", { _id: item._id });
      }}
    >
      <View style={styles.rowBetween}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>
            Customer: <Text style={styles.value}>{item.name}</Text>
          </Text>
          <Text style={styles.label}>
            Phone: <Text style={styles.value}>{item.phone}</Text>
          </Text>
          <Text style={styles.label}>
            Total money:{" "}
            <Text style={[styles.value, styles.money, styles.red]}>
              {formatMoney(item.totalSpent)}
            </Text>
          </Text>
        </View>
        <View style={styles.role}>
          <Icon name="crown" size={20} color="#F75A68" />
          <Text style={styles.roleText}>{item.loyalty}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <View style={styles.wrapper}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.Content title="Customer" titleStyle={styles.appbarTitle} />
        </Appbar.Header>

        <FlatList
          data={customers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.container}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        />

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate("AddCustomer")}
        >
          <Icon name="plus" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
};

export default Customer;

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
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "#8c7d7d",
    fontWeight: "bold",
    marginBottom: 6,
  },
  value: {
    color: "#000",
    fontWeight: "500",
  },
  money: {
    fontWeight: "bold",
  },
  red: {
    color: "#F75A68",
  },
  role: {
    alignItems: "center",
    justifyContent: "center",
  },
  roleText: {
    marginTop: 4,
    color: "#F75A68",
    fontWeight: "bold",
    fontSize: 12,
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
});
