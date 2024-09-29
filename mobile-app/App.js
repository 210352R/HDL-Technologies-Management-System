import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import Material Icons
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome } from "react-native-vector-icons";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import { AuthProvider } from "./context/auth";
import { app, auth } from "./firebase/firebase";
import HomeScreen from "./screens/home/HomeScreen";
import QrScreen from "./screens/qr_code/QrScreen";
import LapBillDetails from "./screens/lap/LapDetails";
import SettingScreen from "./screens/settings/SettingScreen";
import AddNewBill from "./screens/bill/AddNewBill";
import ProfileScreen from "./screens/profile/ProfileScreen";
import AddExtBillForm from "./screens/bill/AddExcistingBill";

const Stack = createNativeStackNavigator();
// Create the navigators
const Drawer = createDrawerNavigator();

function HomeDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          paddingTop: 20, // Add padding to the top of the drawer
          backgroundColor: "#FFFFFFFF", // Background color for the drawer
          width: 240, // Width of the drawer
          borderTopRightRadius: 20, // Add border radius to the top right
          borderBottomRightRadius: 20, // Add border radius to the bottom right
          borderWidth: 1, // Optional: Add border width if desired
          borderColor: "#000", // Optional: Set border color
          marginTop: 20, // Optional: Add margin at the top
          marginBottom: 20, // Optional: Add margin at the bottom
        },
        drawerLabelStyle: {
          color: "#000", // Label color
          fontSize: 20, // Font size for drawer items
        },
      }}
    >
      {/* Custom Profile Section */}
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: () => (
            <View style={styles.profileIconContainer}>
              <FontAwesome name="user-circle" size={60} color="#000" />
              <Text
                style={styles.profileEmail}
                numberOfLines={1} // Limit to one line
                ellipsizeMode="tail" // Show ellipsis at the end if text is too long
              >
                HDL Technologies
              </Text>
              {/* Replace with dynamic email */}
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <FontAwesome name="home" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="New Bill"
        component={AddNewBill}
        options={{
          drawerIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <FontAwesome name="file" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <FontAwesome name="cog" size={size} color={color} />
            </View>
          ),
        }}
      />
      {/* Add more screens here as needed */}
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {/* Define screens and their components */}
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeDrawer"
            component={HomeDrawer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Qrcode"
            component={QrScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LapBillDetails"
            component={LapBillDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ExtBillForm"
            component={AddExtBillForm}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 40, // Set the width of the container
    height: 40, // Set the height of the container
    borderRadius: 20, // Make it circular
    backgroundColor: "#e0e0e0", // Background color for the circle
    justifyContent: "center", // Center the icon
    alignItems: "center", // Center the icon
  },
  profileIconContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFFFFFFF", // Light blue background for the profile area
    borderRadius: 10,
    width: "100%",
    height: 100, // Occupy a quarter of the drawer height
  },
  profileEmail: {
    marginLeft: 10,
    fontSize: 20,
    color: "#000",
  },
});
