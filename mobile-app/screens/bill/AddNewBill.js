import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { Appbar } from "react-native-paper";

const AddNewBill = () => {
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
    images: "",
  });

  const [isSetQr, setIsSetQr] = useState(false);
  const [qrCode, setQrCode] = useState("");

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
        "http://localhost:8000/bill/add-new-bill",
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
        Alert.alert(
          "Error",
          "There was an error generating QR Code! Please try again."
        );
      }
    } catch (error) {
      console.error("There was an error!", error);
      Alert.alert("Error", "There was an error! Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {!isSetQr ? (
          <View style={styles.formContainer}>
            <TextInput
              placeholder="Customer Name"
              placeholderTextColor="white" // Set placeholder text color to white
              style={styles.input}
              value={formData.name}
              onChangeText={(value) => handleChange("name", value)}
            />
            <TextInput
              placeholder="Phone"
              placeholderTextColor="white" // Set placeholder text color to white
              style={styles.input}
              value={formData.phone}
              onChangeText={(value) => handleChange("phone", value)}
              keyboardType="phone-pad"
            />
            <TextInput
              placeholder="Address"
              placeholderTextColor="white" // Set placeholder text color to white
              style={styles.input}
              value={formData.address}
              onChangeText={(value) => handleChange("address", value)}
            />
            <TextInput
              placeholder="Laptop Brand"
              placeholderTextColor="white" // Set placeholder text color to white
              style={styles.input}
              value={formData.brand}
              onChangeText={(value) => handleChange("brand", value)}
            />
            <TextInput
              placeholder="Laptop Model"
              placeholderTextColor="white" // Set placeholder text color to white
              style={styles.input}
              value={formData.model}
              onChangeText={(value) => handleChange("model", value)}
            />
            <TextInput
              placeholder="Issue Description"
              placeholderTextColor="white" // Set placeholder text color to white
              style={styles.input}
              value={formData.issue}
              onChangeText={(value) => handleChange("issue", value)}
              multiline
            />
            <TextInput
              placeholder="Repair Price"
              placeholderTextColor="white" // Set placeholder text color to white
              style={styles.input}
              value={formData.amount}
              onChangeText={(value) => handleChange("amount", value)}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Announce Date"
              placeholderTextColor="white" // Set placeholder text color to white
              style={styles.input}
              value={formData.announce_date}
              onChangeText={(value) => handleChange("announce_date", value)}
            />
            <TextInput
              placeholder="Handover Date"
              placeholderTextColor="white" // Set placeholder text color to white
              style={styles.input}
              value={formData.handover_date}
              onChangeText={(value) => handleChange("handover_date", value)}
            />
            <Picker
              selectedValue={formData.status}
              style={styles.input}
              onValueChange={(itemValue) => handleChange("status", itemValue)}
            >
              <Picker.Item label="Select Status" value="" />
              <Picker.Item label="Pending" value="Pending" />
              <Picker.Item label="In Progress" value="In Progress" />
              <Picker.Item label="Completed" value="Completed" />
            </Picker>
            <TextInput
              placeholder="Image URL or Base64 String (Optional)"
              placeholderTextColor="white" // Set placeholder text color to white
              style={styles.input}
              value={formData.images}
              onChangeText={(value) => handleChange("images", value)}
            />
            <Button title="Submit Bill" onPress={handleSubmit} />
          </View>
        ) : (
          <View style={styles.qrContainer}>
            <Text style={styles.qrText}>QR Code for the Bill:</Text>
            {/* <QRCode value={qrCode} size={200} /> */}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAE9E9FF",
  },
  scrollContainer: {
    padding: 16,
  },
  formContainer: {
    backgroundColor: "#FFFFFFFF",
    padding: 20,
    borderRadius: 8,
    elevation: 4,
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    marginBottom: 12,
    borderRadius: 4,
    padding: 10,
  },
  qrContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  qrText: {
    color: "#fff",
    marginBottom: 10,
  },
});

export default AddNewBill;
