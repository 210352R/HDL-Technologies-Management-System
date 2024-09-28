import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import { AuthProvider } from "./context/auth";
import { app, auth } from "./firebase/firebase";
import HomeScreen from "./screens/home/HomeScreen";
import QrScreen from "./screens/qr_code/QrScreen";
import LapBillDetails from "./screens/lap/LapDetails";
import SettingScreen from "./screens/settings/SettingScreen";
import AddNewBill from "./screens/bill/AddNewBill";

const Stack = createNativeStackNavigator();
// Create the navigators
const Drawer = createDrawerNavigator();

function HomeDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="New Bill" component={AddNewBill} />
      <Drawer.Screen name="Settings" component={SettingScreen} />
      {/* <Drawer.Screen name="QrCode" component={QrScreen} />
      <Drawer.Screen name="Lap Bill Details" component={LapBillDetails} /> */}
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {/* Define screens and their components */}
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeDrawer"
            component={HomeDrawer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Qrcode"
            component={QrScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LapBillDetails"
            component={LapBillDetails}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
