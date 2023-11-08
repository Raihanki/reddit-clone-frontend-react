import { createContext, useContext, useEffect, useState } from "react";
import ApiRequest from "../api/RequestConfig";
import Loading from "../components/Loading";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await ApiRequest.post("/users");
        setAuthenticatedUser(response.data.user);
      } catch (error) {
        setAuthenticatedUser(null);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const login = (user) => {
    setAuthenticatedUser(user);
  };

  const logout = () => {
    setAuthenticatedUser(null);
  };

  const value = {
    authenticatedUser,
    login,
    logout,
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center mt-20">
        <Loading></Loading>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
