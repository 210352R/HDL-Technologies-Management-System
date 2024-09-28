import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const CustomHeader = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Icon name="menu" size={30} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#535D6CFF", // Header background color
    padding: 15,
  },
  headerTitle: {
    fontSize: 20,
    color: "#fff",
  },
});

export default CustomHeader;
