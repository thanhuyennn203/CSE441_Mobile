import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

const Product = () => {
  const [data, setData] = useState([]);
  const filePath = "https://dummyjson.com/products/";

  useEffect(() => {
    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((d) => {
        setData(d.products);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image
              source={{ uri: item.thumbnail }}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>Title: {item.title}</Text>
              <Text>Description: {item.description}</Text>
              <Text style={styles.priceText}>Price: ${item.price}</Text>
              <Text style={styles.discountText}>
                Discount: {item.discountPercentage}% off
              </Text>
              <Text>Rating: {item.rating}</Text>
              <Text>Stock: {item.stock}</Text>
              <Text>Brand: {item.brand}</Text>
              <Text>Category: {item.category}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.buttonText}>ADD</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton}>
                  <Text style={styles.buttonText}>DELETE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default Product;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 10,
  },
  productContainer: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#F9FBFC",
    borderRadius: 8,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 6 },
    shadowOpacity: 0.21,
    shadowRadius: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  discountText: {
    color: "green",
    marginBottom: 5,
  },
  priceText: {
    color: "#FFB544",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    gap: 5,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
  },
});
