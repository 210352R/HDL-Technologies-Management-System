import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Assuming you're using react-native-vector-icons

const QRCodeDisplayScreen = ({
  qrCode,
  customerName,
  laptopModel,
  laptopBrand,
  onDownload,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>QR Code</Text>
        <Text style={styles.subtitle}>Scan the QR code below</Text>
      </View>

      {/* Customer Info */}
      <View style={styles.customerInfo}>
        <Text style={styles.customerText}>Customer: {customerName}</Text>
        <Text style={styles.customerText}>Laptop Model: {laptopModel}</Text>
        <Text style={styles.customerText}>Laptop Brand: {laptopBrand}</Text>
      </View>

      {/* QR Code */}
      <View style={styles.qrCodeContainer}>
        <Image source={{ uri: qrCode }} style={styles.qrCodeImage} />
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Place your device closer to the QR code for scanning.
        </Text>
      </View>

      {/* Download Button */}
      <TouchableOpacity style={styles.downloadButton} onPress={onDownload}>
        <Icon name="download" size={20} color="#fff" />
        <Text style={styles.downloadButtonText}>Download QR Code</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
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
  customerInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  customerText: {
    fontSize: 16,
    color: "#333",
  },
  qrCodeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  qrCodeImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  downloadButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  footer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  footerText: {
    paddingVertical: 10,
    fontSize: 14,
    color: "#888",
  },
});

export default QRCodeDisplayScreen;
