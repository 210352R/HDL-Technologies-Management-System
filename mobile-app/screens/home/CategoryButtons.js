import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Change to any icon set you prefer

const categories = [
  { name: "Analytics", icon: "bar-chart", color: "#3F51B5" },
  { name: "Customers", icon: "home", color: "#FF9800" },
  { name: "Orders", icon: "file-text", color: "#E91E63" },
  { name: "Tasks", icon: "tasks", color: "#4CAF50" },
  { name: "Sales", icon: "bell", color: "#FFEB3B" },
];

const CategoryButtons = () => {
  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.button, { borderColor: category.color }]}
        >
          <Icon name={category.icon} size={30} color={category.color} />
          <Text style={styles.buttonText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    flexWrap: "wrap",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    backgroundColor: "#fff",
    margin: 10,
  },
  buttonText: {
    marginTop: 5,
    fontSize: 14,
    color: "#333",
  },
});

export default CategoryButtons;
