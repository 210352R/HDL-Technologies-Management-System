import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/auth";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginScreen = ({ navigation }) => {
  const [isSigningIn, setIsSigningIn] = useState(false);

  const { userLoggedIn } = useAuth();

  useEffect(() => {
    console.log("Login Screen ------------------ > ");
    //get email from storage check it is not null then navigate to home
    getData("email").then((email) => {
      if (email) {
        console.log("Email retrieved successfully:", email);
        navigation.replace("HomeDrawer");
      }
    });
  }, []);

  // Retrieve data from storage
  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log("Data retrieved successfully:", value);
        return value;
      }
    } catch (error) {
      console.log("Error retrieving data:", error);
    }
  };

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log("Data stored successfully");
    } catch (error) {
      console.log("Error storing data:", error);
    }
  };

  //Login Handler
  const handleLogin = async (values) => {
    try {
      setIsSigningIn(true);
      // Call doSignInWithEmailAndPassword function from auth context
      const res = await doSignInWithEmailAndPassword(
        values.email,
        values.password
      );

      if (res) {
        storeData("email", values.email);
        // Example login action
        Alert.alert("Login Successful", `Welcome, ${values.email}!`);
        navigation.replace("HomeDrawer");
      } else {
        Alert.alert("Login failed", "Please try again!");
      }
    } catch (error) {
      console.log("Login failed", error);
      Alert.alert("Login failed", "Please try again!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Formik for managing form state and validation */}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {errors.email && touched.email ? (
              <Text style={styles.error}>{errors.email}</Text>
            ) : null}

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {errors.password && touched.password ? (
              <Text style={styles.error}>{errors.password}</Text>
            ) : null}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <Text style={styles.footerText}>
        Don't have an account?{" "}
        <Text
          onPress={() => navigation.navigate("Register")}
          style={styles.signupText}
        >
          Sign up here
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  error: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#0D1E30FF",
    borderWidth: 3, // Equivalent to "1px" in CSS
    borderColor: "#FBFDFFFF",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "#007BFF",
    shadowOpacity: 0.6,
    shadowOffset: { width: 1, height: 5 },
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 20,
    color: "#666",
    fontSize: 14,
  },
  signupText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});
