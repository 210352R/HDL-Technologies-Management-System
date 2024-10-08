import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import QRCode from "react-native-qrcode-svg";
import { url } from "../../url";
import QRCodeDisplayScreen from "../qr_code/QRCodeDisplayScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const AddNewBill = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    brand: "",
    model: "",
    issue: "",
    amount: "",
    announce_date: null,
    handover_date: null,
    status: "",
    images: [""],
  });

  const [isSetQr, setIsSetQr] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const qrCodeRef = useRef(null);

  // Date Picker visibility states
  const [showAnnounceDatePicker, setShowAnnounceDatePicker] = useState(false);
  const [showHandoverDatePicker, setShowHandoverDatePicker] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //form submition function
  const handleSubmit = async () => {
    const formDataWithISODate = {
      ...formData,
      announce_date: formData.announce_date
        ? formData.announce_date.toISOString()
        : null,
      handover_date: formData.handover_date
        ? formData.handover_date.toISOString()
        : null,
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

  const onDateChange = (event, selectedDate, fieldName) => {
    const currentDate = selectedDate || formData[fieldName];
    if (fieldName === "announce_date") {
      setShowAnnounceDatePicker(Platform.OS === "ios");
    } else if (fieldName === "handover_date") {
      setShowHandoverDatePicker(Platform.OS === "ios");
    }
    setFormData((prev) => ({
      ...prev,
      [fieldName]: currentDate,
    }));
  };

  const downloadQRCode = () => {
    console.log("Download QR Code");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {!isSetQr ? (
          <View style={styles.formContainer}>
            {/* Form fields */}
            <TextInput
              placeholder="Customer Name"
              style={styles.input}
              value={formData.name}
              onChangeText={(value) => handleChange("name", value)}
            />
            <TextInput
              placeholder="Phone"
              style={styles.input}
              value={formData.phone}
              onChangeText={(value) => handleChange("phone", value)}
              keyboardType="phone-pad"
            />
            <TextInput
              placeholder="Address"
              style={styles.input}
              value={formData.address}
              onChangeText={(value) => handleChange("address", value)}
            />
            <TextInput
              placeholder="Laptop Brand"
              style={styles.input}
              value={formData.brand}
              onChangeText={(value) => handleChange("brand", value)}
            />
            <TextInput
              placeholder="Laptop Model"
              style={styles.input}
              value={formData.model}
              onChangeText={(value) => handleChange("model", value)}
            />
            <TextInput
              placeholder="Issue Description"
              style={styles.input}
              value={formData.issue}
              onChangeText={(value) => handleChange("issue", value)}
              multiline
            />
            <TextInput
              placeholder="Repair Price"
              style={styles.input}
              value={formData.amount}
              onChangeText={(value) => handleChange("amount", value)}
              keyboardType="numeric"
            />
            <View style={styles.datePickerContainer}>
              <TouchableOpacity onPress={() => setShowAnnounceDatePicker(true)}>
                <Text style={styles.dateText}>
                  {formData.announce_date
                    ? "Announce Date :"
                    : "Select Announce Date"}
                </Text>
              </TouchableOpacity>
              {showAnnounceDatePicker && (
                <DateTimePicker
                  value={formData.announce_date || new Date()}
                  mode="date"
                  display="default"
                  styles={styles.datePickerStyle}
                  onChange={(event, selectedDate) =>
                    onDateChange(event, selectedDate, "announce_date")
                  }
                />
              )}
            </View>

            <View style={styles.datePickerContainer}>
              <TouchableOpacity onPress={() => setShowHandoverDatePicker(true)}>
                <Text style={styles.dateText}>
                  {formData.handover_date
                    ? "Handover Date :"
                    : "Select Handover Date"}
                </Text>
              </TouchableOpacity>
              {showHandoverDatePicker && (
                <DateTimePicker
                  value={formData.handover_date || new Date()}
                  mode="date"
                  display="default"
                  styles={styles.datePickerStyle}
                  onChange={(event, selectedDate) =>
                    onDateChange(event, selectedDate, "handover_date")
                  }
                />
              )}
            </View>

            <Picker
              selectedValue={formData.status}
              style={styles.input}
              onValueChange={(itemValue) => handleChange("status", itemValue)}
            >
              <Picker.Item label="Select Status" value="" />
              <Picker.Item label="Pending" value="Pending" />
              <Picker.Item label="Announced" value="Announced" />
              <Picker.Item label="In Progress" value="In Progress" />
              <Picker.Item label="Completed" value="Completed" />
            </Picker>

            <TextInput
              placeholder="Image URL or Base64 String (Optional)"
              style={styles.input}
              value={formData.images}
              onChangeText={(value) => handleChange("images", value)}
            />
            <Button title="Submit Bill" onPress={handleSubmit} />
          </View>
        ) : (
          <View style={styles.centeredView}>
            <QRCodeDisplayScreen
              qrCode={qrCode}
              customerName={formData.name}
              laptopModel={formData.model}
              laptopBrand={formData.brand}
              onDownload={downloadQRCode}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dateText: {
    color: "#333",

    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  datePickerContainer: {
    display: "flex",
    flexDirection: "row",
    height: 60,
  },
  datePickerStyle: {
    width: 400,
    backgroundColor: "#AAA",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#CCC",
  },

  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContainer: {
    paddingHorizontal: 15,
  },
  formContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 20,
  },
  input: {
    color: "#333",
    marginBottom: 15,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#CCC",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default AddNewBill;
