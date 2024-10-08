import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

import { url } from "../../url";
import DateTimePicker from "@react-native-community/datetimepicker";
import QRCodeDisplayScreen from "../qr_code/QRCodeDisplayScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import BarcodeScanner from "../qr_code/QrCodeScanner";

// AddExtBillForm Component
const AddExtBillForm = () => {
  const [lapID, setLapID] = useState("");
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
  const [showHandoverDatePicker, setShowHandoverDatePicker] = useState(false);
  const [showAnnounceDatePicker, setShowAnnounceDatePicker] = useState(false);

  // Fetch laptop details based on lapID
  useEffect(() => {
    const fetchLapDetails = async () => {
      try {
        const response = await axios.get(`${url}/lap/get-lap/${lapID}`);
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

    if (lapID) {
      fetchLapDetails();
    }
  }, [lapID]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const formDataWithISODate = {
      ...formData,
      announce_date: formData.announce_date
        ? new Date(formData.announce_date).toISOString()
        : null,
      handover_date: formData.handover_date
        ? new Date(formData.handover_date).toISOString()
        : null,
      amount: parseFloat(formData.amount),
    };

    try {
      const response = await axios.post(
        `${url}/bill/add-existing-bill`,
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

  const onChangeHandoverDate = (event, selectedDate) => {
    setShowHandoverDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      handleChange("handover_date", formattedDate);
    }
  };

  const onChangeAnnounceDate = (event, selectedDate) => {
    setShowAnnounceDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      handleChange("announce_date", formattedDate);
    }
  };

  const downloadQRCode = () => {
    console.log("Downloading QR Code");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {!lapID ? (
        <View style={styles.container}>
          <Text style={styles.title}>Enter Laptop ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Laptop ID"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={lapID}
            onChangeText={(value) => setLapID(value)}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => setLapID(lapID)}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          <BarcodeScanner setLapID = {setLapID}/>
        </View>
       

      ) : (
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

          {/* Laptop Brand */}
          <TextInput
            style={styles.inputReadOnly}
            placeholder="Laptop Brand"
            placeholderTextColor="#888"
            value={formData.brand}
            editable={false}
          />

          {/* Laptop Model */}
          <TextInput
            style={styles.inputReadOnly}
            placeholder="Laptop Model"
            placeholderTextColor="#888"
            value={formData.model}
            editable={false}
          />

          {/* Laptop ID */}
          <TextInput
            style={styles.inputReadOnly}
            placeholder="Laptop ID"
            placeholderTextColor="#888"
            value={formData.lapId}
            editable={false}
          />

          {/* Issue */}
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

          {/* Handover Date */}
          <TouchableOpacity
            onPress={() => setShowHandoverDatePicker(true)}
            style={styles.dateInput}
          >
            <Text style={styles.dateText}>
              {formData.handover_date || "Select Handover Date"}
            </Text>
          </TouchableOpacity>

          {/* Announce Date */}
          <TouchableOpacity
            onPress={() => setShowAnnounceDatePicker(true)}
            style={styles.dateInput}
          >
            <Text style={styles.dateText}>
              {formData.announce_date || "Select Announce Date"}
            </Text>
          </TouchableOpacity>

          {/* Date Pickers */}
          {showHandoverDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChangeHandoverDate}
            />
          )}
          {showAnnounceDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChangeAnnounceDate}
            />
          )}

          {/* Status */}
          <Picker
            selectedValue={formData.status}
            style={styles.input}
            onValueChange={(value) => handleChange("status", value)}
          >
            <Picker.Item label="Select Status" value="" />
            <Picker.Item label="Pending" value="Pending" />
            <Picker.Item label="Announced" value="Announced" />
            <Picker.Item label="In Progress" value="In Progress" />
            <Picker.Item label="Completed" value="Completed" />
          </Picker>

          {/* Image */}
          <TextInput
            placeholder="Image URL or Base64 String (Optional)"
            placeholderTextColor="#888"
            style={styles.input}
            value={formData.images}
            onChangeText={(value) => handleChange("images", value)}
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Bill</Text>
          </TouchableOpacity>

          {/* QR Code */}
          {isSetQr && (
            <View style={styles.qrContainer}>
              <QRCodeDisplayScreen qrCode={qrCode} />
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={downloadQRCode}
              >
                <Text style={styles.downloadButtonText}>Download QR Code</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "10%", // Adjusted height for buttons
    width: "90%",
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#5e48a6",
    paddingHorizontal: 40,
  },
  barcodeContainer: {
    flex: 1, // This makes sure the barcode container takes up the available space
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  barcodeScanner: {
    flex: 1, // Ensures the scanner takes up the available space inside the container
    width: "100%", // Scanner will fill the container horizontally
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F4F9",
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#FFF",
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: "#333",
  },
  inputReadOnly: {
    width: "100%",
    backgroundColor: "#EFEFEF",
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: "#666",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  dateInput: {
    width: "100%",
    padding: 12,
    backgroundColor: "#FFF",
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  submitButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#00A9F4",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  qrContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  downloadButton: {
    padding: 10,
    backgroundColor: "#00A9F4",
    borderRadius: 5,
    marginTop: 10,
  },
  downloadButtonText: {
    fontSize: 16,
    color: "#FFF",
  },
});

export default AddExtBillForm;
