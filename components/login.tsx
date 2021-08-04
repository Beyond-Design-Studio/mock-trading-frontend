import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "@styles/auth.module.scss";

interface Props {
  setScreen: (value: string | ((prevVar: string) => string)) => void;
}

function LogIn(props: Props): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const loginHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    setError(null);
    if (email === "" || password === "") {
      setError("Please fill in all the fields");
    } else if (!(email.includes("@") && email.includes("."))) {
      setError("Please enter a valid email address");
    } else {
      setError(null);
    }

    if (email === "mail@mail.com" && password === "pass") {
      router.push("/markets");
    } else {
      setError("Password or e-mail invalid");
    }
  };

  return (
    <form className={styles.authContainer}>
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
        <button onClick={(e) => loginHandler(e)} className={styles.authLogInButton}>
          Login
        </button>
      </div>
      <p>mail@mail.com - pass</p>
    </form>
  );
}

export default LogIn;
