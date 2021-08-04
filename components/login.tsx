import React from "react";
import styles from "@styles/auth.module.scss";

interface Props {
  setScreen: (value: string | ((prevVar: string) => string)) => void;
}

 function LogIn(props:Props) {
  return (
      <div className={styles.authContainer}>
        <h1>Login to your account</h1>
        <p>Don't have an account? <a onClick={() => props.setScreen('register')}>Sign up here</a></p>
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

  );
};



export default LogIn;