import { Box, Modal, Typography } from "@mui/material";
import axios from "axios";
import React, { Fragment, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import AuthContext from "../context/AuthContext";
import styles from "./Signup.module.css";
import { BiError } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalText, setModalText] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    navigate("/login");
  };

  const navigate = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);
  // necessary data for sign up
  const signupData = { username, email, password };

  // sign up handler
  const signupHandler = (e) => {
    e.preventDefault();
    signup();
  };

  // sign up function
  const signup = async () => {
    try {
      if (username && email && password === confirmPassword) {
        await axios.post("/api/user/signup", signupData);
        await getLoggedIn();
        setOpen(true);
        setModalText("Please Login to Continue!");

        // alert("Resister Success! Please Login");
        // navigate("/login");
      } else {
        setOpen(true);
        setModalText("Something Went Wrong!");
        // alert("something went wrong");
      }
    } catch (error) {
      console.error(error.message);
      setOpen(true);
      setModalText("Something Went Wrong!");
      // alert("something went wrong");
    }
  };
  return (
    <Fragment>
      <Navbar title={"Sign Up"} />
      <div className={styles.max_width}>
        <div>
          <form onSubmit={signupHandler}>
            <div className={styles.username}>
              <label className={styles.label}>Username</label>
              <input
                className={styles.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter username"
              />
            </div>
            <div className={styles.email}>
              <label className={styles.label}>Email</label>
              <input
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email..."
              />
            </div>
            <div className={styles.password}>
              <label className={styles.label}>Password</label>
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <div className={styles.password}>
              <label className={styles.label}>Confirm Password</label>
              <input
                className={styles.input}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter your password again"
              />
            </div>
            <button className={styles.submit} type="submit">
              Sign Up
            </button>
          </form>
          <p className={styles.login}>
            Have Account? <Link to={"/login"}>Login.</Link>
          </p>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#fff",
            boxShadow: 24,
            paddingTop: 6,
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          {modalText === "Please Login to Continue!" ? (
            <AiOutlineCheckCircle
              size={44}
              style={{
                color: "green",
              }}
            />
          ) : (
            <BiError
              size={44}
              style={{
                color: "#EE5353",
              }}
            />
          )}

          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              paddingX: 8,
            }}
          >
            {modalText === "Please Login to Continue!"
              ? "Register Success"
              : "Error"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, paddingX: 8 }}>
            {modalText ? modalText : ""}
          </Typography>
          <Typography
            sx={{
              backgroundColor:
                modalText === "Please Login to Continue!" ? "green" : "#EE5353",
              color: "#fff",
              marginTop: "30px",
              padding: "15px 10px",
              border: "none",
              cursor: "pointer",
              outline: "none",
              // "&:hover": {
              //   backgroundColor: "#2980b9",
              //   color: "#fff",
              // },
            }}
            onClick={handleClose}
          >
            Dismiss
          </Typography>
        </Box>
      </Modal>
    </Fragment>
  );
}

export default Signup;
