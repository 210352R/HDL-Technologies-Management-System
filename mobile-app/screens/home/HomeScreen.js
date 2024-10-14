import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";

import { useAuth } from "../../context/auth";
import { useCameraPermissions } from "expo-camera";
import { LineChart } from "react-native-chart-kit";
import CategoryButtons from "./CategoryButtons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// for websocket connection
import { io } from "socket.io-client";
import { url } from "../../url";
import axios from "axios";

// Adjust the path based on your project structure


const HomeScreen = ({ navigation }) => {
  const { userLoggedIn } = useAuth();
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted); // Check if permission is granted
  const [notification, setNotification] = useState(""); // State for notifications

  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility


  const socket = io(url);

  useEffect(() => {
    console.log(
      "Socker Server try to connect ----------****-------------------- "
    );

    // Listen for messages from the server
    socket.on("message", (message) => {
      setNotification(message);
    });

    // Clean up the connection when component unmounts
    return () => {
      socket.disconnect();
      console.log("Disconnected from WebSocket server");
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

  const overDueBills = [
    {
      billID : "1",
      laptopBrand : "Apple",
      laptopModel : "MacBook Pro 2021",
      announceDate : "2021-08-05",
      handoverDate : "2021-08-10",

    },
    {
      billID : "2",
      laptopBrand : "Apple",
      laptopModel : "iPad Pro 2021",
      announceDate : "2021-08-05",
      handoverDate : "2021-08-10",
    },
    {
      billID : "3",
      laptopBrand : "Apple",
      laptopModel : "MacBook Air 2021",
      announceDate : "2021-08-05",
      handoverDate : "2021-08-10",
    },
   
  ];

  const recentBills = [
    {
      billID : "4",
      laptopBrand : "Apple",
      laptopModel : "MacBook Pro 2021",
      announceDate : "2021-08-05",
      handoverDate : "2021-08-10",

    },
    {
      billID : "5",
      laptopBrand : "Apple",
      laptopModel : "iPad Pro 2021",
      announceDate : "2021-08-05",
      handoverDate : "2021-08-10",
    },
    {
      billID : "6",
      laptopBrand : "Apple",
      laptopModel : "MacBook Air 2021",
      announceDate : "2021-08-05",
      handoverDate : "202",
    }
    
  ];

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


  //render recent bill item
  const renderRecentBillItem = ({ item }) => (
    <View style={styles.recentBillItem}>
      <View style = {styles.leftDiv}>
      <Text style={styles.recentBillTitle}>{item.billID}</Text>
      <Text style={styles.recentBillContent}>{item.laptopBrand}</Text>
      <Text style={styles.recentBillContent}>{item.laptopModel}</Text>
      </View>

      <View style = {styles.rightDiv}>
      <Text style={styles.recentBillContent}>Announce Date</Text>
      <Text style={styles.recentBillContent}>{item.announceDate}</Text>
      <Text style={styles.recentBillContent}>Handover Date</Text>
      <Text style={styles.recentBillContent}>{item.handoverDate}</Text>
      </View>
      <View>
      <TouchableOpacity>
        {/*right arrow*/}
        <MaterialIcons
          name="keyboard-arrow-right"
          size={28}
          
          style={styles.qrIcon}
        />
      </TouchableOpacity>
      </View>
    </View>
  );


  //render bill item
  const renderBillItem = ({ item }) => (
    <View style={styles.billItem}>
      <View style = {styles.leftDiv}>
      <Text style={styles.billTitle}>{item.billID}</Text>
      <Text style={styles.billContent}>{item.laptopBrand}</Text>
      <Text style={styles.billContent}>{item.laptopModel}</Text>
      </View>
      <View style = {styles.rightDiv}>
      <Text style={styles.billContent}>Announce Date</Text>
      <Text style={styles.billContent}>{item.announceDate}</Text>
      <Text style={styles.billContent}>Handover Date</Text>
      <Text style={styles.billContent}>{item.handoverDate}</Text>
      </View>
      <View>
      <TouchableOpacity>
        {/*right arrow*/}
        <MaterialIcons
          name="keyboard-arrow-right"
          size={28}
          color="#fff"
          style={styles.qrIcon}
        />
      </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View>
          <CategoryButtons  />
        </View>

        {/* Line Chart */}
        <Text style={styles.chartTitle}>Overview</Text>
        <LineChart
          data={chartData}
          width={350}
          height={220}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
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

        {/* Overdue Bills */}
        { overDueBills  ? <Text style={styles.sectionTitle}>Overdue Bills</Text> : <Text style={styles.sectionTitle}>No Overdue Bills</Text>}
        {overDueBills &&
        <FlatList
          data={overDueBills}
          renderItem={renderBillItem} 
          keyExtractor={(item) => item.id}
          style={styles.billList}
        />
    }

        {/* Recent Bills */}
        <Text style={styles.sectionTitle}>Recent Bills</Text>
        <FlatList
          data={recentBills}
          renderItem={renderRecentBillItem}
          keyExtractor={(item) => item.id}
          style={styles.billList}
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
  recentBillItem: {
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginVertical: 5,
    elevation: 4,

    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    borderColor : "#921A40",
    borderWidth : 2,
  },
  billContent   : {
    color : "#fff",
    fontSize : 12,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 20,
    flex: 1,
  },
  leftDiv: {
    flex: 1,
  },
  rightDiv: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  billList: {
    marginBottom: 20,
  },
  billItem: {
    padding: 10,
    backgroundColor: "#C75B7A",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    borderColor : "#921A40",
    borderWidth : 2,
    
    
  },

  recentBillTitle: {
    fontSize: 16,
    fontWeight: "bold",

  },
  recentBillContent: {

    fontSize : 12,
  },


  billTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  qrButton: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    width: "90%",
    justifyContent: "center",
    backgroundColor: "#4C56AFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 20,
  },
  qrButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  qrIcon: {
    marginRight: 10,
  },
});
