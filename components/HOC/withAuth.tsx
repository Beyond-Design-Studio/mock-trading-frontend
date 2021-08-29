import { useRouter } from "next/router";
import { useAuth } from "@components/contexts/authContext";
import { ComponentType } from "react";
function withAuth<P>(WrappedComponent: ComponentType<P>) {
  return (props: P) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const token = localStorage.getItem("token");
      console.log(token);
      
      // If there is no access token we redirect to "/auth" page.
      if (!token) {
        Router.replace("/auth");
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;