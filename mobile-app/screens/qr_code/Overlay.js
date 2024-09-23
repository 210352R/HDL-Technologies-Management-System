import React from "react";
import { StyleSheet, View } from "react-native";

const Overlay = () => {
  return (
    <View style={styles.container}>
      <View style={styles.dimOverlay} />
      <View style={styles.focusArea} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  dimOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Dimmed background
  },
  focusArea: {
    width: 220, // Diameter of the focus area
    height: 200,
    borderWidth: 5,
    borderColor: "green",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -100, // Half of width
    marginTop: -100, // Half of height
    backgroundColor: "transparent", // Ensure it doesn't fill
  },
});

export default Overlay;
