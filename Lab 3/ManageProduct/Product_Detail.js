import React from "react";
import { useState, useEffect } from "react";

import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import { Card, Button, Text } from "react-native-paper";

const ProductDetail = () => {
  const [data, setData] = useState(null);
  const filePath = "https://dummyjson.com/products/2";

  useEffect(() => {
    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((d) => {
        setData(d);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {data && (
          <Card>
            <Card.Cover source={{ uri: data.thumbnail }} />
            <Card.Content>
              <Text style={styles.title}>{data.title}</Text>
              <Text>Description: {data.description}</Text>
              <Text>Price: ${data.price}</Text>
              <Text>Discount: {data.discountPercentage}%</Text>
              <Text>Rating: {data.rating} stars</Text>
              <Text>Stock: {data.stock} units</Text>
              <Text>Brand: {data.brand}</Text>
              <Text>Category: {data.category}</Text>
            </Card.Content>
            <Card.Actions style={styles.actions}>
              <Button mode="contained" buttonColor="red">
                Delete
              </Button>
              <Button mode="outlined">Cancel</Button>
            </Card.Actions>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  actions: {
    justifyContent: "space-between",
    padding: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
