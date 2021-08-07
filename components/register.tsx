import React, { useState } from "react";
import styles from "@styles/auth.module.scss";

interface Props {
  setScreen: (value: string | ((prevVar: string) => string)) => void;
}

function Register(props: Props): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confPassword, setConfPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  function registerHandler() {
    setError(null);
    if (email === "" || password === "" || confPassword === "") {
      setError("Please fill in all the fields");
    } else if (!(email.includes("@") && email.includes("."))) {
      setError("Please enter a valid email address");
    } else if (password !== confPassword) {
      setError("The entered passwords do not match");
    } else if (password.length < 8) {
      setError("Please choose a longer password");
    } else {
      setError(null);
      //Register request
    }
  }

  return (
    <div className={styles.authContainer}>
      <h1>Register a new account</h1>
      <p>
        Already have an account?{" "}
        <a onClick={() => props.setScreen("login")}>Log in here</a>
      </p>
      <div className={styles.fieldContainer}>
        <label>Email</label>
        <input
          className="input"
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.fieldContainer}>
        <label>Password</label>
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.fieldContainer}>
        <label>Confirm Password</label>
        <input
          className="input"
          type="password"
          name="conf-password"
          placeholder="Confirm Password"
          onChange={(e) => setConfPassword(e.target.value)}
        />
      </div>
      {error && (
        <div className={styles.errorContainer}>
          <p>{error}</p>
        </div>
      )}
      <div>
        <button onClick={registerHandler} className={styles.authRegisterButton}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
