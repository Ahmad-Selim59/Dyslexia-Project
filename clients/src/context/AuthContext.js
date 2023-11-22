import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthContextProvider(props) {
  // user, who is logged in, info
  const [loggedIn, setLoggedIn] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  async function getLoggedIn() {
    const loggedInRes = await axios.get("/api/user/loggedIn");
    setLoggedIn(loggedInRes.data.success);
    setUser(loggedInRes.data.user);
    setLoading(false);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, user, getLoggedIn }}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
