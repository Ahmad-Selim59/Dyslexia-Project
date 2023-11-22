import axios from "axios";
import React, { Fragment, useState } from "react";
import Navbar from "../Components/Navbar";
import styles from "./ForgetPassword.module.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const loginHandler = async (e) => {
    e.preventDefault();
    await axios.post(`/api/user/send-reset-password`, { email });
    setSendEmail(true);
  };
  return (
    <Fragment>
      <Navbar title={"Forget Password"} />
      <div className={styles.max_width}>
        {sendEmail ? (
          <h2>Password changing request send, Check your mail</h2>
        ) : (
          <Fragment>
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

                <button className={styles.submit} type="submit">
                  Submit
                </button>
              </form>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Login;
