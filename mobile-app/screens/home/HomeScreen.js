import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { doSignOut } from "../../firebase/auth";
import { useAuth } from "../../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCameraPermissions } from "expo-camera";
import { LineChart } from "react-native-chart-kit";
import CategoryButtons from "./CategoryButtons";
// Adjust the path based on your project structure

const HomeScreen = ({ navigation }) => {
  const { userLoggedIn } = useAuth();
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted); // Check if permission is granted

  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility

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
    { id: "2", title: "Skater Dress", amount: "$149.21", date: "Aug 11" },
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
    {
      id: "7",
      title: "Bose SoundLink II",
      amount: "$199.99",
      date: "Aug 15",
    },
    {
      id: "8",
      title: "Nike Air Max 270",
      amount: "$129.99",
      date: "Aug 16",
    },
    {
      id: "9",
      title: "Levi's 511 Slim Jeans",
      amount: "$69.50",
      date: "Aug 17",
    },
    {
      id: "10",
      title: "Adidas Ultraboost 21",
      amount: "$179.95",
      date: "Aug 18",
    },
    {
      id: "11",
      title: "Apple MacBook Air",
      amount: "$999.00",
      date: "Aug 19",
    },
    {
      id: "12",
      title: "Dell XPS 13",
      amount: "$949.99",
      date: "Aug 20",
    },
    {
      id: "13",
      title: "Google Nest Hub",
      amount: "$89.99",
      date: "Aug 21",
    },
    {
      id: "14",
      title: "Fitbit Charge 5",
      amount: "$149.95",
      date: "Aug 22",
    },
    {
      id: "15",
      title: "Kindle Paperwhite",
      amount: "$139.99",
      date: "Aug 23",
    },
    {
      id: "16",
      title: "Instant Pot Duo 7-in-1",
      amount: "$89.99",
      date: "Aug 24",
    },
    {
      id: "17",
      title: "Ring Video Doorbell",
      amount: "$99.99",
      date: "Aug 25",
    },
    {
      id: "18",
      title: "HP Envy x360",
      amount: "$899.99",
      date: "Aug 26",
    },
  ];

  const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log("Error removing data:", error);
    }
  };

  // const logOutHandler = async () => {
  //   await doSignOut();
  //   await removeData("email");
  //   console.log("User signed out ------------------ ");
  //   navigation.replace("Login"); // Redirect to login page
  // };

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
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text>{item.title}</Text>
            <Text>{item.amount}</Text>
            <Text>{item.date}</Text>
          </View>
        )}
      />

      {/* QR Scanner Button */}
      <TouchableOpacity style={styles.qrButton} onPress={handleQrScan}>
        <Text style={styles.qrButtonText}>QR Scanner</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileImageContainer: {
    marginLeft: "auto",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  dropdown: {
    position: "absolute",
    right: 20,
    top: 60,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
  },
  dropdownItem: {
    padding: 10,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
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
    backgroundColor: "#4C56AFFF", // Green background color
    paddingVertical: 10, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 5, // Rounded corners
    alignItems: "center", // Center the text
    marginTop: 10, // Space above the button
  },
  qrButtonText: {
    color: "#fff", // White text color
    fontSize: 16, // Font size
    fontWeight: "bold", // Bold text
  },
});
