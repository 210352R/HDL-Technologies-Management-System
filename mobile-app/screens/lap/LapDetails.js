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
import { Button } from "react-native-elements";

const LapBillDetails = ({ route, navigation }) => {
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
        <View style={styles.billHeader}>
          <Text style={styles.issueText}>Issue: {item.issue}</Text>
          <Text style={styles.statusText}>
            Status: <Text style={styles.statusValue}>{item.status}</Text>
          </Text>
        </View>
        <View style={styles.billContent}>
          <Text style={styles.text}>
            Amount: <Text style={styles.highlightText}>Rs {item.amount}</Text>
          </Text>
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
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading bills...</Text>
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
      <Button
        title="Add New Bill"
        buttonStyle={styles.addButton}
        titleStyle={styles.addButtonText}
        onPress={() => navigation.navigate("ExtBillForm")}
      />
    </View>
  );
};

export default LapBillDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 15,
  },
  billContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  billHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  issueText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#888",
  },
  statusValue: {
    color: "#FF6347", // Tomato color for status
  },
  billContent: {
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 6,
  },
  highlightText: {
    color: "#2E8B57", // SeaGreen color for highlighting amount
    fontWeight: "bold",
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
    color: "#777",
    marginTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  addButton: {
    backgroundColor: "#1E90FF", // DodgerBlue color
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginVertical: 10,
    alignSelf: "center",
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});
