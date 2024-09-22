import {
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Pressable,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library
import { Camera, CameraView } from "expo-camera";
import Overlay from "./Overlay"; // Assuming you have an Overlay component

const QrScreen = () => {
  const navigation = useNavigation();
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <Icon
        name="arrow-back"
        size={30}
        color="#fff"
        onPress={handleBackPress}
        style={styles.backIcon}
      />
      <View style={styles.overlayTextContainer}>
        <Text style={styles.overlayText}>Scan QR Code</Text>
      </View>
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            qrLock.current = true;
            console.log("Scanned data: ", data);
            // Handle scanned data (e.g., open URL)
          }
        }}
      />
      <Overlay />
      <View style={styles.overlayTextContainer}>
        <Pressable onPress={handleBackPress}>
          <Text style={styles.overlayText}>Go to Home</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default QrScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backIcon: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  camera: {
    flex: 1,
    justifyContent: "center",
  },
  overlayTextContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  overlayText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
  },
});
