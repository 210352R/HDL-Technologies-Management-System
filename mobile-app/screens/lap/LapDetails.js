import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { url } from "../../url.js";

const LapBillDetails = ({ route }) => {
  const { lapId } = route.params; // Passed via navigation props
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bills by lapId when component mounts
  useEffect(() => {
    console.log("Fetching bills for lap: ", lapId);
    const fetchBills = async () => {
      try {
        const response = await axios.get(`${url}/lap/get-bill/${lapId}`);
        setBills(response.data.bills);
      } catch (error) {
        console.error("Error fetching bills:   ---  ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, [lapId]);

  // Render a single bill item
  const renderBillItem = ({ item }) => {
    return (
      <View style={styles.billContainer}>
        <Text style={styles.issueText}>Issue: {item.issue}</Text>
        <Text style={styles.text}>Amount: Rs {item.amount}</Text>
        <Text style={styles.text}>Status: {item.status}</Text>
        <Text style={styles.text}>
          Date: {new Date(item.date).toLocaleDateString()}
        </Text>
        <Text style={styles.text}>
          Announce Date: {new Date(item.announce_date).toLocaleDateString()}
        </Text>
        <Text style={styles.text}>
          Handover Date: {new Date(item.handover_date).toLocaleDateString()}
        </Text>
        {item.images && item.images[0] !== "" && (
          <Image source={{ uri: item.images[0] }} style={styles.billImage} />
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading bills...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bills}
        keyExtractor={(item) => item.id}
        renderItem={renderBillItem}
        ListEmptyComponent={
          <Text style={styles.noBillsText}>No bills available</Text>
        }
      />
    </View>
  );
};

export default LapBillDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  billContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  issueText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  billImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  noBillsText: {
    textAlign: "center",
    fontSize: 18,
    color: "#555",
    marginTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
