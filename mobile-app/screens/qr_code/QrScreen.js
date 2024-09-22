import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library

const QrScreen = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Icon
        name="arrow-back"
        size={30}
        color="#000"
        onPress={handleBackPress}
        style={styles.backIcon}
      />
      <Text>QrScreen</Text>
    </View>
  );
};

export default QrScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backIcon: {
    position: "absolute",
    top: 40,
    left: 20,
  },
});
