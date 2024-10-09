
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
const UpdateBillForm = ({ route, navigation }) => {
    const { billID } = route.params;
    const [laptopBrand, setLaptopBrand] = useState("");
    const [laptopModel, setLaptopModel] = useState("");
    const [announceDate, setAnnounceDate] = useState("");
    const [handoverDate, setHandoverDate] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Function to get bill data from bill ID
    const getBillByBillID = async () => {
        if (billID) {
        try {
            const response = await fetch(`http://ep/${billID}`);
            const data = await response.json();
            console.log(data);
    
            // Handle data as needed
            setLaptopBrand(data.laptopBrand);
            setLaptopModel(data.laptopModel);
            setAnnounceDate(data.announceDate);
            setHandoverDate(data.handoverDate);
        } catch (error) {
            console.error(error);
        }
        }
    };
    
    useEffect(() => {
        getBillByBillID();
    }, [billID]);
    
    // Function to update bill
    const updateBill = async () => {
        setIsSubmitting(true);
        try {
        const response = await fetch(`http://ep/${billID}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            laptopBrand,
            laptopModel,
            announceDate,
            handoverDate,
            }),
        });
        const data = await response.json();
        console.log(data);
        setIsSubmitting(false);
        navigation.navigate("Home");
        } catch (error) {
        console.error(error);
        setIsSubmitting(false);
        }
    };
    
    return (
        <View style={styles.container}>
        <Text style={styles.label}>Laptop Brand</Text>
        <TextInput
            style={styles.input}
            value={laptopBrand}
            onChangeText={setLaptopBrand}
        />
        <Text style={styles.label}>Laptop Model</Text>
        <TextInput
            style={styles.input}
            value={laptopModel}
            onChangeText={setLaptopModel}
        />
        <Text style={styles.label}>Announce Date</Text>
        <TextInput
            style={styles.input}
            value={announceDate}
            onChangeText={setAnnounceDate}
        />
        <Text style={styles.label}>Handover Date</Text>
        <TextInput
            style={styles.input}
            value={handoverDate}
            onChangeText={setHandoverDate}
        />
        <TouchableOpacity
            style={styles.button}
            onPress={updateBill}
            disabled={isSubmitting}
        >
            <Text style={styles.buttonText}>
            {isSubmitting ? "Updating..." : "Update Bill"}
            </Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#3498db",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
});