import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useAuth } from "../../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCameraPermissions } from "expo-camera";
import { LineChart } from "react-native-chart-kit";
import CategoryButtons from "./CategoryButtons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// for websocket connection
import { io } from "socket.io-client";
import { url } from "../../url";
import axios from "axios";

const socket = io.connect(url);
// Adjust the path based on your project structure

const HomeScreen = ({ navigation }) => {
  const { userLoggedIn } = useAuth();
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted); // Check if permission is granted

  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility

  // code for establish connection by calling url
  const setConnection = async () => {
    try {
      const response = await axios.get(`${url}/connection-rt`);
    } catch (error) {
      console.log("Error in web socket connection:", error);
    }
  };

  useEffect(() => {
    console.log("User Logged In: **--  -------- ");

    setConnection();

    // Listen for messages from the server
    socket.on("message", (newMessage) => {
      console.log(newMessage);
    });

    // Cleanup socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  // Sample data for the chart
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        data: [29000, 30000, 32000, 28000, 31000, 33000, 32000],
        strokeWidth: 2,
      },
    ],
  };

  const orders = [
    {
      id: "1",
      title: "Daniel Wellington Classic",
      amount: "$149.21",
      date: "Aug 11",
    },
    {
      id: "2",
      title: "Skater Dress",
      amount: "$149.21",
      date: "Aug 11",
    },
    {
      id: "3",
      title: "Daniel Wellington Classic",
      amount: "$149.21",
      date: "Aug 11",
    },
    {
      id: "4",
      title: "Apple AirPods Pro",
      amount: "$249.99",
      date: "Aug 12",
    },
    {
      id: "5",
      title: "Sony WH-1000XM4",
      amount: "$348.00",
      date: "Aug 13",
    },
    {
      id: "6",
      title: "Samsung Galaxy S21",
      amount: "$799.99",
      date: "Aug 14",
    },
  ];

  const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log("Error removing data:", error);
    }
  };

  const handleQrScan = async () => {
    if (isPermissionGranted) {
      navigation.navigate("Qrcode");
    } else {
      await requestPermission();
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View>
          <CategoryButtons />
        </View>
        {/* Line Chart */}
        <Text style={styles.chartTitle}>Overview</Text>
        <LineChart
          data={chartData}
          width={350} // from react-native
          height={220}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "3",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
        />

        {/* Overview Statistics */}
        <View style={styles.overview}>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewValue}>$32,575</Text>
            <Text>Total Revenue</Text>
          </View>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewValue}>$20,590</Text>
            <Text>Total Profit</Text>
          </View>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewValue}>17,100</Text>
            <Text>Total Views</Text>
          </View>
        </View>

        {/* Recent Orders Section */}
        <Text style={styles.recentOrdersTitle}>Recent Orders</Text>
        <FlatList
          style={styles.recentOrdersList}
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Text>{item.title}</Text>
              <Text>{item.amount}</Text>
              <Text>{item.date}</Text>
            </View>
          )}
          nestedScrollEnabled={true} // Enables nested scrolling
        />
      </ScrollView>

      {/* QR Scanner Button */}
      <TouchableOpacity style={styles.qrButton} onPress={handleQrScan}>
        <MaterialIcons
          name="qr-code-scanner"
          size={28}
          color="#fff"
          style={styles.qrIcon}
        />
        <Text style={styles.qrButtonText}>QR Scanner</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 20,
    flex: 1,
  },
  chartTitle: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: "bold",
  },
  overview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  overviewItem: {
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  overviewValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  recentOrdersList: {
    marginBottom: 80,
  },
  recentOrdersTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  qrButton: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    width: "90%",
    justifyContent: "center",
    backgroundColor: "#4C56AFFF", // Button background color
    paddingVertical: 10, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 5, // Rounded corners
    alignItems: "center", // Center the text
    marginHorizontal: 20, // Space around the button
  },
  qrButtonText: {
    color: "#fff", // White text color
    fontSize: 18, // Font size
    fontWeight: "bold", // Bold text
  },
  qrIcon: {
    marginRight: 20, // Optional: Adjust if necessary
  },
});
