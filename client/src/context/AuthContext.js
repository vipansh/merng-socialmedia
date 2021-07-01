import React, { useContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("jwtToken");
      } else {
        setCurrentUser(decodedToken);
      }
    }
  }, []);

  const [errorsList, setErrorsList] = useState(null);

  console.log(currentUser);
  const value = {
    currentUser,
    setCurrentUser,
    setErrorsList,
    errorsList,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
