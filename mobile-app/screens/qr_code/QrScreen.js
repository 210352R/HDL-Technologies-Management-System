import { StyleSheet, Text, View } from "react-native";
import React from "react";

const QrScreen = () => {
  return (
    <View style={styles.container}>
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
});
