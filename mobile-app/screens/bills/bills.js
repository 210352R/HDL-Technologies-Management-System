import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// Dummy Categories
const categories = ["Overdue", "Pending", "Announced", "Completed", "Canceled"];

// Dummy Bills Data
const dummyBills = {
  Overdue: [
    { id: "1", billName: "Bill 001", amount: "500", date: "2024-10-01" },
    { id: "2", billName: "Bill 002", amount: "200", date: "2024-10-02" },
  ],
  Pending: [
    { id: "3", billName: "Bill 003", amount: "150", date: "2024-10-03" },
    { id: "4", billName: "Bill 004", amount: "350", date: "2024-10-04" },
  ],
  Announced: [
    { id: "5", billName: "Bill 005", amount: "450", date: "2024-10-05" },
    { id: "6", billName: "Bill 006", amount: "550", date: "2024-10-06" },
  ],
  Completed: [
    { id: "7", billName: "Bill 007", amount: "300", date: "2024-10-07" },
    { id: "8", billName: "Bill 008", amount: "400", date: "2024-10-08" },
  ],
  Canceled: [
    { id: "9", billName: "Bill 009", amount: "250", date: "2024-10-09" },
    { id: "10", billName: "Bill 010", amount: "500", date: "2024-10-10" },
  ],
};

const Bills = () => {
  const [selectedCategory, setSelectedCategory] = useState("Overdue");
  const [selectedCategoryBills, setSelectedCategoryBills] = useState([]);

  // Function to render each bill in the FlatList
  const renderBillItem = ({ item }) => (
    <View style={styles.billItem}>
      <Text style={styles.billName}>{item.billName}</Text>
      <Text style={styles.billAmount}>{item.amount}</Text>
      <Text style={styles.billDate}>{item.date}</Text>
    </View>
  );

  //fetch bills from the selected category
  const fetchBills = (category) => {
    setSelectedCategoryBills(dummyBills[category]);
  };

  useEffect(() => {
    fetchBills(selectedCategory);
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      {/* Horizontal Scrollable Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryItem,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Vertically Scrollable List of Bills */}
      <FlatList
        data={selectedCategoryBills}
        renderItem={renderBillItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.billList}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  categoryContainer: {
    flexDirection: "row",
    height: 80,
    display: "flex",
    marginBottom: 10,
  },
  categoryItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
    height: 50,
    borderRadius: 20,
    marginRight: 10,
    marginVertical: 10,
  },
  selectedCategory: {
    backgroundColor: "#2196F3",
  },
  categoryText: {
    fontSize: 16,
    color: "#333",
  },
  billList: {
    paddingBottom: 20,
    paddingTop: 10,
    marginTop: 10,

    height: "100%",
  },
  billItem: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  billName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  billAmount: {
    fontSize: 16,
    color: "#666",
  },
  billDate: {
    fontSize: 14,
    color: "#999",
  },
});

export default Bills;
