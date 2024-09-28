import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { doSignOut } from "../../firebase/auth";
import { useAuth } from "../../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCameraPermissions } from "expo-camera";
import CustomHeader from "./CustomHeader"; // Adjust the path based on your project structure

const HomeScreen = ({ navigation }) => {
  const { userLoggedIn } = useAuth();
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted); // Check if permission is granted

  const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log("Error removing data:", error);
    }
  };

  const logOutHandler = async () => {
    await doSignOut();
    await removeData("email");
    console.log("User signed out ------------------ ");
    navigation.replace("Login"); // Redirect to login page
  };

  const handleQrScan = async () => {
    if (isPermissionGranted) {
      navigation.navigate("Qrcode");
    } else {
      await requestPermission();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
      <Text style={styles.message}>You are logged in!</Text>

      <Button title="Logout" onPress={logOutHandler} />

      <Button title="QR Scanner" onPress={handleQrScan} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
  },
});
