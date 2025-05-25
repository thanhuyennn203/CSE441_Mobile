import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [rating, setRating] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState("");

  function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  const handleSubmit = () => {
    if (
      !title ||
      !description ||
      !price ||
      !discountPercentage ||
      !rating ||
      !stock ||
      !brand ||
      !category ||
      !images
    ) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    if (description.length <= 50) {
      Alert.alert(
        "Validation Error",
        "Description must be more than 50 characters."
      );
      return;
    }

    if (
      !isNumber(price) ||
      !isNumber(discountPercentage) ||
      !isNumber(rating) ||
      !isNumber(stock)
    ) {
      Alert.alert(
        "Validation Error",
        "Price, Discount %, Rating, and Stock must be numbers."
      );
      return;
    }

    fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        description: description,
        price: price,
        discountPercentage: discountPercentage,
        rating: rating,
        stock: stock,
        brand: brand,
        category: category,
        images: images,
      }),
    })
      .then((res) => res.json())
      .then(console.log);

    Alert.alert("Success", "Added successfull");
    console.log({
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      images,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setPrice("");
    setDiscountPercentage("");
    setRating("");
    setStock("");
    setBrand("");
    setCategory("");
    setImages("");
  };

  const fields = [
    {
      label: "Title",
      value: title,
      setter: setTitle,
      placeholder: "Enter title",
    },
    {
      label: "Description",
      value: description,
      setter: setDescription,
      placeholder: "Enter description",
    },
    {
      label: "Price",
      value: price,
      setter: setPrice,
      placeholder: "Enter price",
      keyboardType: "numeric",
    },
    {
      label: "Discount Percentage",
      value: discountPercentage,
      setter: setDiscountPercentage,
      placeholder: "Enter discount percentage",
      keyboardType: "numeric",
    },
    {
      label: "Rating",
      value: rating,
      setter: setRating,
      placeholder: "Enter rating",
      keyboardType: "numeric",
    },
    {
      label: "Stock",
      value: stock,
      setter: setStock,
      placeholder: "Enter stock",
      keyboardType: "numeric",
    },
    {
      label: "Brand",
      value: brand,
      setter: setBrand,
      placeholder: "Enter brand",
    },
    {
      label: "Category",
      value: category,
      setter: setCategory,
      placeholder: "Enter category",
    },
    {
      label: "Images",
      value: images,
      setter: setImages,
      placeholder: "Enter image URL(s)",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Add a Product</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <FlatList
          data={fields}
          keyExtractor={(item) => item.label}
          renderItem={({ item }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{item.label}</Text>
              <TextInput
                style={styles.input}
                placeholder={item.placeholder}
                value={item.value}
                onChangeText={item.setter}
                keyboardType={"default"}
              />
            </View>
          )}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  header: {
    fontWeight: "bold",
    fontSize: 18,
    color: "blue",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 2,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    marginTop: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AddProduct;
