import React from "react";
import styles from "@styles/auth.module.scss";

interface Props {
  setScreen: (value: string | ((prevVar: string) => string)) => void;
}

 function Register(props:Props) {
  return (
      <div className={styles.authContainer}>
        <h1>Register a new account</h1>
        <p>Already have an account? <a onClick={() => props.setScreen('login')}>Log in here</a></p>
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
        <div className={styles.fieldContainer}>
          <label>Confirm Password</label>
          <input
            className="input"
            type="password"
            name="conf-password"
            placeholder="Confirm Password"
            required
            />
        </div>
        <div>
        <button className={styles.authRegisterButton}>Register</button>
        </div>
      </div>

  );
};



export default Register;