import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Authenticate({ children }) {
  const { authenticatedUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticatedUser) {
      navigate("/login");
    }
  }, [authenticatedUser, navigate]);

  return <>{authenticatedUser ? children : null}</>;
}
