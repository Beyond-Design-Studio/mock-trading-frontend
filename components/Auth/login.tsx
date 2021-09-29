import React, { useState } from "react";
import qs from 'qs';
import styles from "@styles/auth.module.scss";
import axios from "axios";
import router from "next/router";
import { useAuth } from "@components/contexts/authContext";

interface Props {
  setScreen: (value: string | ((prevVar: string) => string)) => void;
}


function LogIn(props: Props): JSX.Element {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { user, setUser } = useAuth();

  const createPortfolio = (jwt: string, username: string, id: number) => {
    axios({ method: "post", headers: { Authorization: `Bearer ${jwt}` }, url: "/portfolios", data: qs.stringify({ "InvestorName": username, "AvailableFunds": 100000, "AllocatedFunds": 0, "NetWorth": 100000, "user": id }) })
      .then(res => {
        console.log(`[PORTFOLIO CREATED]`, res.data)
        setUser({ ...user, portfolio: res.data.id })
        localStorage.setItem("token", res.data.jwt);
        router.push("/home");
      })
      .catch(err => {
        console.error(err);
        return;
      })
  }

  const loginHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    setError(null);

    if (email === "" || password === "") {
      setError("Please fill in all the fields");
    } else if (!(email.includes("@") && email.includes("."))) {
      setError("Please enter a valid email address");
    } else {
      setError(null);

      axios({ method: "POST", url: "/auth/local", data: qs.stringify({ "identifier": email, "password": password }) })
        .then(res => {
          // console.log(res.data);

          setUser({
            jwt: res.data.jwt,
            id: res.data.user.id,
            username: res.data.user.username,
            portfolio: res.data.user.portfolio ? res.data.user.portfolio.id : -1
          });
          if (!res.data.user.portfolio) {
            // console.log("[PORTFOLIO NOT FOUND]")
            createPortfolio(res.data.jwt, res.data.user.username, res.data.user.id);
          } else {
            localStorage.setItem("token", res.data.jwt);
            router.push("/home");
          }

        })
        .catch((err) => {
          console.error(err);
          setError("Some Error Occured, please try again");
        });
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
    </form>
  );
}

export default LogIn;
