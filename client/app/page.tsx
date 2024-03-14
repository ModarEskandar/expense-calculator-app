"use client";

import { useEffect } from "react";
import { useUserContext } from "./context/AuthContext";
import { useRouter } from "next/router";


function MyApp({ Component, pageProps }:any) {
  const router = useRouter();
  const {isAuthenticated}=useUserContext();

  useEffect(() => {
    
    const handleRouteChange = (url:string) => {
      console.log(url);

      if (!isAuthenticated && url.includes("expenses")) {
        router.replace('/signin');
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;