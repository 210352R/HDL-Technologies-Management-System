import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Change to any icon set you prefer
import { useNavigation } from "@react-navigation/native";

const categories = [
  { name: "Bills", icon: "file-text", color: "#E91E63" },
  { name: "Customers", icon: "home", color: "#FF9800" },
  { name: "Orders", icon: "file-text", color: "#E91E63" },
  { name: "Tasks", icon: "tasks", color: "#4CAF50" },
  { name: "Sales", icon: "bell", color: "#FFEB3B" },
];

const CategoryButtons = () => {
  const navigation = useNavigation(); // Use the useNavigation hook to get the navigation object
  const handleNavigation = (category) => {
    navigation.navigate(category.name);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.button, { borderColor: category.color }]}
          onPress={() => handleNavigation(category)}  // Updated this line
        >
          <Icon name={category.icon} size={30} color={category.color} />
          <Text style={styles.buttonText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    backgroundColor: "#fff",
    marginRight: 10, // Use marginRight instead of margin to space out buttons horizontally
  },
  buttonText: {
    marginTop: 5,
    fontSize: 14,
    color: "#333",
  },
});

export default CategoryButtons;
