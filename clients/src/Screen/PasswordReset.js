import { Box, Modal, Typography } from "@mui/material";
import axios from "axios";
import React, { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import styles from "./PasswordReset.module.css";
import { RiLockPasswordFill } from "react-icons/ri";

const PasswordReset = () => {
  // password changing state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // token from url
  const { token } = useParams();

  const navigate = useNavigate();

  //   set new password
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [modalText, setModalText] = useState("");
  const resetPasswordHandler = async (e) => {
    try {
      e.preventDefault();
      if (password === confirmPassword) {
        await axios.post(`/api/user/resetPassword/${token}`, { password });
        // after changing password, go to /login url
        navigate("/login");
      } else {
        setModalText("Password do not match");
        setOpen(true);
        // alert("Password do not match");
      }
    } catch (error) {
      setModalText("Something Went wrong!");
      setOpen(true);
      // alert("Something Went wrong!");
    }
  };

  return (
    <Fragment>
      <Navbar title={"Reset Password"} />
      <div className={styles.max_width}>
        <div>
          <form onSubmit={resetPasswordHandler}>
            <div className={styles.password}>
              <label className={styles.label}>New Password</label>
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <div className={styles.password}>
              <label className={styles.label}>Confirm Password</label>
              <input
                className={styles.input}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter password again"
              />
            </div>

            <button className={styles.submit} type="submit">
              Submit
            </button>
          </form>
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
          <RiLockPasswordFill
            size={44}
            style={{
              color: "#3498db",
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
            Password Reset
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, paddingX: 8 }}>
            {modalText ? modalText : ""}
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

export default PasswordReset;
