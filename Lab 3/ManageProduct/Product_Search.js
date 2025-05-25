import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Card } from "react-native-paper";

const SearchProduct = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    let filePath = "https://dummyjson.com/products";
    if (query !== "")
      filePath = "https://dummyjson.com/products/search?q=" + query;

    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setResults(data.products);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.thumbnail }} />
      <Card.Content>
        <Text style={styles.title}>{item.title}</Text>
        <Text>Description: {item.description}</Text>
        <Text>Price: ${item.price}</Text>
        <Text>Discount: {item.discountPercentage}%</Text>
        <Text>Rating: {item.rating} stars</Text>
        <Text>Stock: {item.stock} units</Text>
        <Text>Brand: {item.brand}</Text>
        <Text>Category: {item.category}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Search Products</Text>
      <TextInput
        style={styles.input}
        placeholder="search..."
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity style={styles.buttonSearch} onPress={handleSearch}>
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>

      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </SafeAreaView>
  );
};

export default SearchProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  card: {
    marginBottom: 15,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  buttonSearch: {
    backgroundColor: "#3f99f2",
    padding: 15,
    borderRadius: 50,
  },
  searchText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});
