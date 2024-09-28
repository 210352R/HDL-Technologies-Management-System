import React from "react";
import { View, Image, StyleSheet, Text, SafeAreaView } from "react-native";

const QRCodeDisplayScreen = ({ qrCode }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>QR Code</Text>
        <Text style={styles.subtitle}>Scan the QR code below</Text>
      </View>

      <View style={styles.qrCodeContainer}>
        <Image source={{ uri: qrCode }} style={styles.qrCodeImage} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Place your device closer to the QR code for scanning.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "space-between",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  qrCodeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  qrCodeImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  footer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#888",
  },
});

export default QRCodeDisplayScreen;
