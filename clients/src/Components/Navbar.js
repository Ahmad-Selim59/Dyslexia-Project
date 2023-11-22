import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
const Navbar = ({ title, play, handleBack }) => {
  // collect from url
  const { pathname } = useLocation();
  return (
    <div className={styles.navbar}>
      {pathname === "/" ? (
        <div></div>
      ) : !play ? (
        <Link to="/" className={styles.home_btn}>
          &#10094; Home
        </Link>
      ) : (
        // when we click on play button
        <div
          onClick={handleBack}
          className={styles.home_btn}
          style={{
            cursor: "pointer",
          }}
        >
          &#10094; Play
        </div>
      )}
      <div>{title}</div>
      <div></div>
    </div>
  );
};

export default Navbar;
