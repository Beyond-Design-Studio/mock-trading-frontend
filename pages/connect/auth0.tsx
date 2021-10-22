import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router'

import styles from "@styles/auth0.module.scss";
import loadingstyle from "@styles/loading.module.scss";

const backendUrl = process.env.NEXT_PUBLIC_DATABASE_URL;

const LoginRedirect = () => {
  const router = useRouter();
  const [text, setText] = useState('Loading...');
  const { access_token } = router.query;
  // const location = useLocation();
  // const params = useParams();
  // const history = useHistory();

  useEffect(() => {
    // Successfully logged with the provider
    // Now logging with strapi by using the access_token (given by the provider) in props.location.search
    // console.log('LoginRedirect: useEffect', access_token);
    fetch(`${backendUrl}/auth/auth0/callback?access_token=${access_token}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then(res => res.json())
      .then(res => {
        // Successfully logged with Strapi
        // Now saving the jwt to use it for future authenticated requests to Strapi
        localStorage.setItem('token', res.jwt);
        localStorage.setItem('username', res.user.username);
        setText('You have been successfully logged in. You will be redirected in a few seconds...');
        setTimeout(() => router.push('/home'), 3000); // Redirect to homepage after 3 sec
      })
      .catch(err => {
        console.log(err);
        setText('An error occurred, please see the developer console.')
      });
  }, [access_token]);


  return (
    <Fragment>
      <div className={styles["top-div"]}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div className={loadingstyle.bouncingLoader}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p>{text}</p>
        </div>
      </div>

    </Fragment>

  )
};

export default LoginRedirect;
