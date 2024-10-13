import { StyleSheet, Text, View } from "react-native";
import React from "react";

const BillScreen = () => {
  return (
    <View style={styles.container}>
      <Text>BillScreen</Text>
    </View>
  );
};

export default BillScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
