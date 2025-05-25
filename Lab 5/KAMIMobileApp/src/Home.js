import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Appbar, Text, Card, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const ServiceList = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const url = "https://kami-backend-5rs0.onrender.com/services";

  useEffect(() => {
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
  }, []);

  const renderService = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetailService", { service: item })}
    >
      <Card style={styles.card} mode="outlined">
        <Card.Content style={styles.cardContent}>
          <Text
            variant="bodyMedium"
            numberOfLines={1}
            style={styles.serviceName}
          >
            {item.name}
          </Text>
          <Text variant="bodyMedium" style={styles.price}>
            {item.price} đ
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="HUYỀN TRINH" titleStyle={styles.appbarTitle} />
        <Appbar.Action
          icon="account-circle"
          color="white"
          onPress={() => navigation.navigate("Login")}
        />
      </Appbar.Header>

      <View style={styles.container}>
        <Image
          source={{
            uri: "https://www.creativefabrica.com/wp-content/uploads/2020/01/23/Spa-treatment-salon-logo-Beauty-woman-Graphics-1-41-580x348.jpg",
          }}
          style={styles.logo}
        />

        <View style={styles.titleRow}>
          <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
            Danh sách dịch vụ
          </Text>
          <IconButton
            icon="plus-circle"
            iconColor="#F75A68"
            size={28}
            onPress={() => navigation.navigate("AddService")}
          />
        </View>

        <FlatList
          data={services}
          keyExtractor={(item) => item._id}
          renderItem={renderService}
          contentContainerStyle={{ gap: 8 }}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </SafeAreaView>
  );
};

export default ServiceList;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },
  appbar: {
    backgroundColor: "#F75A68",
    zIndex: 10,
    elevation: 4,
    position: "relative",
  },
  appbarTitle: { color: "white", fontWeight: "bold" },
  logo: {
    width: "100%",
    height: 160,
    resizeMode: "contain",
    marginVertical: 16,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceName: {
    flex: 1,
    fontWeight: "500",
  },
  price: {
    marginLeft: 10,
    fontWeight: "bold",
  },
});
