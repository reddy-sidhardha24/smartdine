import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {

  // ADMIN TOKEN

  const [adminToken, setAdminToken] =
    useState(
      localStorage.getItem("adminToken")
    );

  // ADMIN DATA

  const [adminData, setAdminData] =
    useState(
      JSON.parse(
        localStorage.getItem("adminData")
      ) || null
    );

  // LOGIN FUNCTION

  const loginAdmin = (
    token,
    admin
  ) => {

    localStorage.setItem(
      "adminToken",
      token
    );

    localStorage.setItem(
      "adminData",
      JSON.stringify(admin)
    );

    setAdminToken(token);

    setAdminData(admin);

  };

  // LOGOUT FUNCTION

  const logoutAdmin = () => {

    localStorage.removeItem(
      "adminToken"
    );

    localStorage.removeItem(
      "adminData"
    );

    setAdminToken(null);

    setAdminData(null);

  };

  // PERSIST LOGIN

  useEffect(() => {

    const token =
      localStorage.getItem(
        "adminToken"
      );

    const admin =
      JSON.parse(
        localStorage.getItem(
          "adminData"
        )
      );

    if (token && admin) {

      setAdminToken(token);

      setAdminData(admin);

    }

  }, []);

  return (

    <AuthContext.Provider
      value={{
        adminToken,
        adminData,
        loginAdmin,
        logoutAdmin,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};

// CUSTOM HOOK

export const useAuth = () => {

  return useContext(AuthContext);

};