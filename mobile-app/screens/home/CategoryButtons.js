import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Change to any icon set you prefer

const categories = [
  { name: "Update Bill", icon: "plus", color: "#FF9800" },
  { name: "Customers", icon: "home", color: "#FF9800" },
  { name: "Orders", icon: "file-text", color: "#E91E63" },
  { name: "Tasks", icon: "tasks", color: "#4CAF50" },
  { name: "Sales", icon: "bell", color: "#FFEB3B" },
];

const CategoryButtons = ({ navigation }) => {

  const handleNavigation = () => {
    navigation.navigate('ExtBillForm');
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
          onPress={handleNavigation}  // Use onPress instead of onClick
          style={[styles.button, { borderColor: category.color }]}
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
