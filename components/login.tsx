import React, { useState } from "react";
import styles from "@styles/auth.module.scss";

interface Props {
  setScreen: (value: string | ((prevVar: string) => string)) => void;
}

function LogIn(props: Props): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  
  const loginHandler = () => {
    setError(null);
    if (email === "" || password === "") {
      setError("Please fill in all the fields");
    } else if (!(email.includes("@") && email.includes("."))) {
      setError("Please enter a valid email address");
    } else {
      setError(null);
    }
  }
  
  return (
    <div className={styles.authContainer}>
      <h1>Login to your account</h1>
      <p>
        {"Don't have an account? "}
        <a onClick={() => props.setScreen("register")}>Sign up here</a>
      </p>
      <div className={styles.fieldContainer}>
        <label>Email</label>
        <input
          className="input"
          type="text"
          name="email"
          placeholder="Email"
          value={email}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && (
        <div className={styles.errorContainer}>
          <p>{error}</p>
        </div>
      )}
      <div>
        <button onClick={loginHandler} className={styles.authLogInButton}>
          Login
        </button>
      </div>
    </div>
  );
}

export default LogIn;
