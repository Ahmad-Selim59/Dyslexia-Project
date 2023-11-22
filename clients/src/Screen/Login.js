import React, { Fragment, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import styles from "./Login.module.css";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { Box, Modal, Typography, Button } from "@mui/material";
import { BiError } from "react-icons/bi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  // for keeping user logged in
  const { getLoggedIn } = useContext(AuthContext);
  // necessary data for login
  const loginData = { email, password };

  // after logged in, navigate to back
  const navigate = useNavigate();

  // login handler
  const loginHandler = (e) => {
    e.preventDefault();
    login();
  };

  // login function
  const login = async () => {
    try {
      const user = await axios.post("/api/user/login", loginData);
      await getLoggedIn();
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      setOpen(true);
      // alert("Something Went wrong!");
    }
  };
  return (
    <Fragment>
      <Navbar title={"Login"} />
      <div className={styles.max_width}>
        <div>
          <form onSubmit={loginHandler}>
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
                placeholder="Enter your PASSWORD..."
              />
            </div>
            <Link to="/forgot-password" className={styles.forgot_password}>
              Forgot password
            </Link>
            <button className={styles.submit} type="submit">
              Login
            </button>
          </form>
          <p className={styles.resister}>
            Not resistered? <Link to={"/signup"}>Signup for free.</Link>
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
          <BiError
            size={44}
            style={{
              color: "#EE5353",
            }}
          />
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              paddingX: 8,
            }}
          >
            Oh Sorry
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, paddingX: 8 }}>
            Username or Password is incorrect!
          </Typography>
          <Typography
            sx={{
              backgroundColor: "#EE5353",
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
};

export default Login;
