import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
// import { GoogleAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { url } from "../../url";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isCompanyUser, setIsCompanyUser] = useState(false);
  const [loading, setLoading] = useState(true);

  // Method to check if an email exists
  const checkEmailExists = async (email) => {
    console.log("User Email  --- > ", email);
    try {
      const response = await axios.get(
        `${url}/admin/companies/email-exists/${email}`
      );
      console.log(
        `Email existence check result: ${email} ->`,
        response.data.exists
      );
      return response.data.exists;
    } catch (error) {
      console.error(
        "Error checking email existence:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Failed to check email existence"
      );
    }
  };

  useEffect(() => {
    // listen for auth state changes in firebase
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, [setIsCompanyUser]);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });

      // check if provider is email and password login
      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      const isCompany = false;
      console.log("User Email", user.email);
      let isEmailExists = await checkEmailExists(user.email);
      if (isEmailExists) {
        console.log("User is company user-----------------------------------");
        setIsCompanyUser(true);
        console.log("Is company user", isCompanyUser);
      } else {
        console.log("User is not company user--------------------------------");
        setIsCompanyUser(false);
      }
      console.log("Is company user *********************** ", isCompanyUser);
      setIsEmailUser(isEmail);
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }

    setLoading(false);
  }

  const value = {
    userLoggedIn,
    isEmailUser,
    currentUser,
    isCompanyUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
