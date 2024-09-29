import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";
import QRCode from "react-native-qrcode-svg";
import { url } from "../../url";

// AddExtBillForm Component
const AddExtBillForm = ({ route }) => {
  const { lapId } = route.params; // lapId passed as a param from navigation
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    brand: "",
    model: "",
    issue: "",
    amount: "",
    announce_date: "",
    handover_date: "",
    status: "",
    images: [""],
    lapId: "", // New field for lapId
  });
  const [isSetQr, setIsSetQr] = useState(false);
  const [qrCode, setQrCode] = useState("");

  // Fetch lap details on component mount using lapId
  useEffect(() => {
    console.log("Fetching laptop details for lapId  --- : ", lapId); // Log lapId for debugging
    const fetchLapDetails = async () => {
      try {
        const response = await axios.get(`${url}/get-lap/${lapId}`);
        const { brand, model, lapId } = response.data.lap;
        setFormData((prev) => ({
          ...prev,
          brand: brand || "N/A",
          model: model || "N/A",
          lapId: lapId || "N/A",
        }));
      } catch (error) {
        console.error("Error fetching laptop details:", error);
        Alert.alert("Error", "Error fetching laptop details!");
      }
    };

    fetchLapDetails();
  }, [lapId]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const formDataWithISODate = {
      ...formData,
      announce_date: new Date(formData.announce_date).toISOString(),
      handover_date: new Date(formData.handover_date).toISOString(),
      amount: parseFloat(formData.amount),
    };

    try {
      const response = await axios.post(
        `${url}/bill/add-new-bill`,
        formDataWithISODate,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.qr_code) {
        setIsSetQr(true);
        setQrCode(response.data.qr_code);
      } else {
        Alert.alert("Error", "There was an error generating the QR Code!");
      }
    } catch (error) {
      console.error("Error submitting bill:", error);
      Alert.alert("Error", "Error submitting bill! Please try again.");
    }
  };

  if (isSetQr) {
    return (
      <View style={styles.qrCodeContainer}>
        <Text style={styles.qrCodeTitle}>QR Code</Text>
        <QRCode value={qrCode} size={200} />
        <Text style={styles.qrCodeText}>{formData.brand}</Text>
        <Text style={styles.qrCodeText}>{formData.model}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Bill</Text>

      {/* Name */}
      <TextInput
        style={styles.input}
        placeholder="Customer Name"
        placeholderTextColor="#888"
        value={formData.name}
        onChangeText={(value) => handleChange("name", value)}
      />

      {/* Phone */}
      <TextInput
        style={styles.input}
        placeholder="Phone"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        value={formData.phone}
        onChangeText={(value) => handleChange("phone", value)}
      />

      {/* Address */}
      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#888"
        value={formData.address}
        onChangeText={(value) => handleChange("address", value)}
      />

      {/* Laptop Brand (Read-Only) */}
      <TextInput
        style={styles.inputReadOnly}
        placeholder="Laptop Brand"
        placeholderTextColor="#888"
        value={formData.brand}
        editable={false}
      />

      {/* Laptop Model (Read-Only) */}
      <TextInput
        style={styles.inputReadOnly}
        placeholder="Laptop Model"
        placeholderTextColor="#888"
        value={formData.model}
        editable={false}
      />

      {/* Laptop ID (Read-Only) */}
      <TextInput
        style={styles.inputReadOnly}
        placeholder="Laptop ID"
        placeholderTextColor="#888"
        value={formData.lapId}
        editable={false}
      />

      {/* Issue Description */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Issue Description"
        placeholderTextColor="#888"
        multiline={true}
        numberOfLines={4}
        value={formData.issue}
        onChangeText={(value) => handleChange("issue", value)}
      />

      {/* Repair Price */}
      <TextInput
        style={styles.input}
        placeholder="Repair Price"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={formData.amount}
        onChangeText={(value) => handleChange("amount", value)}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Bill</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#1E1E1E",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#333",
    color: "#FFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  inputReadOnly: {
    backgroundColor: "#444",
    color: "#AAA",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  qrCodeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1E1E1E",
  },
  qrCodeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
  },
  qrCodeText: {
    color: "#FFF",
    marginTop: 10,
  },
});

export default AddExtBillForm;
