import React from "react";

import styles from "@styles/auth.module.scss";

const Auth = (): JSX.Element => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.background}></div>
      <div className={styles.logInContainer}>
        <h1>Login to your account</h1>
        <p>Don't have an account? <a>Sign up here</a></p>
        <div className={styles.fieldContainer}>
          <label >Email</label>
          <input
            className="input"
            type="text"
            name="email"
            placeholder="Email"
            required
            />
        </div>
        <div className={styles.fieldContainer}>
          <label>Password</label>
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            required
            />
        </div>
        <div>
        <button className={styles.authLogInButton}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
