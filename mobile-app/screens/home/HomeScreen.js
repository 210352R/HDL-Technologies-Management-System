import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { doSignOut } from "../../firebase/auth";
import { useAuth } from "../../context/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useCameraPermissions } from "expo-camera";

const HomeScreen = ({ navigation }) => {
  const { userLoggedIn } = useAuth();

  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted); // Check if permission is granted

  // Remove data from storage
  const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log("Error removing data:", error);
    }
  };

  const logOutHandler = async () => {
    // Handle logout logic here
    await doSignOut();
    await removeData("email");
    console.log("User signed out ------------------ ");
    navigation.replace("Login"); // Redirect to login page
  };
  console.log("User logged in: ", userLoggedIn);

  const handleQrScan = async () => {
    // navigation.navigate("Qrcode");
    if (isPermissionGranted) {
      navigation.navigate("Qrcode");
    } else {
      await requestPermission();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>

      <>
        <Text style={styles.message}>You are logged in!</Text>
        <Button title="Logout" onPress={logOutHandler} />

        <Text>{"\n"}</Text>
        <Button title="QR Scanner" onPress={handleQrScan} />
      </>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
  },
});
