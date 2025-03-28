import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome"; // Ensure you have this installed
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doSignOut } from "../../firebase/auth";

const ProfileScreen = ({ navigation }) => {
  // State for dynamic user data
  const [userName, setUserName] = useState("HDL Computer Solutions"); // Replace with dynamic user data if available
  const [userEmail, setUserEmail] = useState(""); // Replace with dynamic user email if available

  useEffect(() => {
    console.log("Login Screen ------------------ > ");
    //get email from storage check it is not null then navigate to home
    getData("email").then((email) => {
      if (email) {
        setUserEmail(email);
      }
    });
  }, []);

  // Retrieve data from storage
  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log("Data retrieved successfully:", value);
        return value;
      }
    } catch (error) {
      console.log("Error retrieving data:", error);
    }
  };

  const handleLogout = async () => {
    await doSignOut();
    await removeData("email");
    console.log("User signed out ------------------ ");
    navigation.replace("Login"); // Redirect to login page
  };

  const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log("Error removing data:", error);
    }
  };
  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }} // Replace with user's profile image URL
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{userEmail}</Text>
      </View>

      {/* Profile Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          <FontAwesome name="edit" size={24} color="#000" />
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <FontAwesome name="lock" size={24} color="#000" />
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <FontAwesome name="sign-out" size={24} color="#000" />
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 16,
    color: "#555",
  },
  optionsContainer: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 18,
    color: "#000",
  },
});

export default ProfileScreen;
