import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import styles from "./Home.module.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  // for authentication
  const { loggedIn } = useAuth();
  const { getLoggedIn } = useAuth();
  const user = JSON.parse(localStorage.getItem("currentUser"))
    ? JSON.parse(localStorage.getItem("currentUser"))
    : null;
  // console.log(loggedIn);

  // for sign out
  const SignOut = async () => {
    await axios.post("/api/user/signout");
    localStorage.removeItem("currentUser");
    getLoggedIn();
  };
  return (
    <Fragment>
      <Navbar title={"Home"} />
      <div className={styles.container}>
        <div className={styles.buttonContainers}>
          {/* if cookies found and user found in localstorage then */}
          {loggedIn && user ? (
            <Link to="/login" onClick={() => SignOut()}>
              Log Out
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <Link to="/stats">Stats</Link>
          <Link to="/chat">Message</Link>
        </div>
        <Link className={styles.play_btn} to="/play">
          Play
        </Link>
      </div>
    </Fragment>
  );
};

export default Home;
