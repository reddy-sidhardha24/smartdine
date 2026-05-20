import {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);

  const [admin, setAdmin] =
    useState(null);

  // USER LOGIN

  const login = (userData) => {

    localStorage.setItem(
      "token",
      userData.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);

  };

  // USER LOGOUT

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);

  };

  // ADMIN LOGIN

  const loginAdmin = (
    adminData
  ) => {

    localStorage.setItem(
      "adminToken",
      adminData.token
    );

    localStorage.setItem(
      "admin",
      JSON.stringify(adminData)
    );

    setAdmin(adminData);

  };

  // ADMIN LOGOUT

  const logoutAdmin = () => {

    localStorage.removeItem(
      "adminToken"
    );

    localStorage.removeItem(
      "admin"
    );

    setAdmin(null);

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        admin,
        login,
        logout,
        loginAdmin,
        logoutAdmin,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};

export const useAuth = () => {

  return useContext(
    AuthContext
  );

};