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
  {
    name: "Analytics",
    icon: "bar-chart",
    color: "#3F51B5",
    link: "/AnalyticsScreen",
  },
  { name: "Customers", icon: "home", color: "#FF9800", link: "/Users" },
  { name: "Orders", icon: "file-text", color: "#E91E63", link: "/Bills" },
  { name: "Laps", icon: "tasks", color: "#4CAF50", link: "/Laps" },
  { name: "Sales", icon: "bell", color: "#FFEB3B", link: "/Sales" },
];

const CategoryButtons = () => {
  const navigation = useNavigation(); // Hook to get the navigation prop

  const handlePress = (categoryLink) => {
    navigation.navigate(categoryLink); // Navigate to the screen with the corresponding name
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
          onPress={() => handlePress(category.link)}
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
