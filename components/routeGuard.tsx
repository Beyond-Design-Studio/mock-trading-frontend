import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from "@components/contexts/authContext";

export { RouteGuard };

interface Props {
  children: any;
}
function RouteGuard(props: Props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const { user } = useAuth();
  // console.log("user", user);

  useEffect(() => {
    // on initial load - run auth check 
    // console.log("authorized", authorized);
    !user.jwt && authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false  
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check 
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorized]);

  function authCheck(url: any) {
    // redirect to login page if accessing a private page and not logged in 
    // console.log("url", url);
    const publicPaths = ['/', '/auth', '/register', '/login',];
    const path = url.split('?')[0];
    if (!user.jwt && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/auth',
        // query: { returnUrl: router.asPath }
      });
    } else {
      setAuthorized(true);
    }
  }

  return (authorized && props.children);
}
