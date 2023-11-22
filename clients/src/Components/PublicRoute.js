import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("currentUser"))
    ? JSON.parse(localStorage.getItem("currentUser"))
    : null;

  const { loggedIn } = useAuth();

  // if user is found in local storage, then redirect to home page meaning user is already logged in
  if (user && loggedIn) {
    return <Navigate to="/" />;
  }

  // not authorized so return child components where they wanted to go
  return children;
}
