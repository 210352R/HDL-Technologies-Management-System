import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';

const UpdateBill = () => {
  const [billID, setBillID] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [lapID, setLapID] = useState('');   
    const nav = useNavigation();

  // Request camera permission for QR scanner
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  // Function to handle QR code scan
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setBillID(data); // Update the billID state
    Alert.alert('QR code scanned!', `Bill ID: ${data}`);
    setLapID(data);
  };

    // Function to simulate update bill action
    const handledUpdateBill = () => {
        if(billID) {
            nav.navigate('UpdateBill', { billID });
        }
        
    }

  // Function to get bill data from lap ID
  const getBillsByLapID = async () => {
    if (lapID) {
      try {
        const response = await fetch(`http://ep/${lapID}`);
        const data = await response.json();
        console.log(data);

        //select pending bill from the bill list and set bill id to billID
        // Handle data as needed
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getBillsByLapID();
  }, [lapID]);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update Bill</Text>

      {/* Text Input for Bill ID */}
      <TextInput
        style={styles.input}
        placeholder="Enter Bill ID"
        value={billID}
        onChangeText={setBillID}
      />

      {/* Button to simulate update action */}
      <Button title="Update Bill" onPress={handledUpdateBill} />

      {/* QR Code Scanner */}
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Button to scan again if needed */}
        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
        )}
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  scannerContainer: {
    height: 300, // Set a specific height for the scanner container
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Add border radius
    borderColor: '#ccc', // Add border color
    borderWidth: 1, // Add border width
    backgroundColor: '#f9f9f9', // Optional: Add a light background color
    overflow: 'hidden', // Ensure child components do not overflow 
  },
});

export default UpdateBill;
