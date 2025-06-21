import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Appbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Setting = ({ navigation }) => {
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.replace("Login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to logout.");
    }
  };

  return (
    <SafeAreaProvider>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Setting" titleStyle={styles.appbarTitle} />
      </Appbar.Header>
      <View style={StyleSheet.container}>
        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
};
export default Setting;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 20,
  },
  appbar: {
    backgroundColor: "#F75A68",
    zIndex: 10,
    elevation: 4,
  },
  appbarTitle: { color: "white", fontWeight: "bold", textAlign: "left" },
  button: {
    backgroundColor: "#F75A68",
    borderRadius: 30,
    // width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    margin: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});
