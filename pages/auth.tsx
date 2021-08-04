import React, { useState } from "react";
import styles from "@styles/auth.module.scss";
import LogIn from "@components/login";
import Register from "@components/register";

const Auth = (): JSX.Element => {
 const [screen, setScreen] = useState('login')


  return (
    <div className={styles.pageContainer}>
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
