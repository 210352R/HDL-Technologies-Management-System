import React, { useState } from "react";
//import useeffect
import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

// for authentication
import { useAuth } from "../../context/auth";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";

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
    console.log("User logged in: ", userLoggedIn);
    if (userLoggedIn) {
      console.log("User is logged in ------ ");
      navigation.replace("Home"); // Navigate to 'Home' screen if logged in
    }
  }, [userLoggedIn, navigation]);

  //Login Handler
  const handleLogin = async (values) => {
    if (!isSigningIn) {
      try {
        setIsSigningIn(true);
        // Call doSignInWithEmailAndPassword function from auth context
        await doSignInWithEmailAndPassword(values.email, values.password);
        console.log(
          "Sign in successful ------------------------------------------------"
        );

        // Example login action
        Alert.alert("Login Successful", `Welcome, ${values.email}!`);
        navigation.replace("Home");
      } catch (error) {
        console.log("Login failed", error);
        Alert.alert("Login failed", "Please try again!");
      }
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
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={styles.signupText}>Sign up here</Text>
        </Pressable>
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
