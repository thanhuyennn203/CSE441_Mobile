import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import styles from "./Style";

const App = () => {
  const [income, setIncome] = useState("");
  const [tax, setTax] = useState("");

  const calculateTax = () => {
    const incomeAmount = parseFloat(income);

    if (isNaN(incomeAmount) || incomeAmount < 0) {
      setTax("Invalid income");
      return;
    }

    let taxAmount = 0;

    if (incomeAmount <= 1000000) {
      taxAmount = incomeAmount * 0.1;
    } else if (incomeAmount <= 5000000) {
      taxAmount = 1000000 * 0.1 + (incomeAmount - 1000000) * 0.2;
    } else {
      taxAmount =
        1000000 * 0.1 + 4000000 * 0.2 + (incomeAmount - 5000000) * 0.3;
    }

    setTax(`Income Tax: ${taxAmount.toFixed(2)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Income Tax Calculator</Text>

      <TextInput
        textAlign="right"
        style={styles.input}
        placeholder="Enter your income"
        keyboardType="numeric"
        value={income}
        onChangeText={(text) => setIncome(text)}
      />

      <Button title="Calculate Tax" onPress={calculateTax} />

      <Text style={styles.result}>{tax}</Text>
    </View>
  );
};

export default App;
