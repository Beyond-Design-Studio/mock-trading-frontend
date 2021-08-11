import React, { useState } from "react";
import styles from "@styles/auth.module.scss";
import LogIn from "@components/Auth/login";
import Register from "@components/Auth/register";
import Head from "next/head";
import Nav from "@components/nav";

const Auth = (): JSX.Element => {
  const [screen, setScreen] = useState('login')
  return (
    <div className={styles.pageContainer}>

      <Head>
        <title>{screen === "login" ? "Login" : "Register"}</title>
      </Head>

      <Nav />
      
      <div className={styles.background}></div>
      {screen === "login" && (
        <LogIn setScreen={setScreen}/>
      )}
      {screen === "register" && (
        <Register setScreen={setScreen} />
      )}
    </div>
  );
};

export default Auth;
