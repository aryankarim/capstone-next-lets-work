import "@fontsource/roboto";
import "@fontsource/roboto/300.css";
import Layout from "../components/Layout";
import { ChakraProvider } from "@chakra-ui/provider";
import { Skeleton } from "@chakra-ui/react";
import { appWithTranslation } from "next-i18next";
import { wrapper } from "../store";
import theme from "../styles/theme/index";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../firebase/firebase";
import { setIsLoggedIn } from "../store/auth/authSlice";
import { useDispatch } from "react-redux";
import { Router } from "next/router";
import Head from "next/head";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false });

const App = ({ Component, pageProps }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsLoaded(true);

      user ? dispatch(setIsLoggedIn(true)) : dispatch(setIsLoggedIn(false));
    });
  }, [dispatch]);

  Router.events.on("routeChangeStart", (url) => {
    NProgress.start();
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    NProgress.done();
    setLoading(false);
  });

  return (
    <>
      <Head>
        <meta name="title" content="Let's Work" />
        <meta
          name="description"
          content="Connect with people who are driven by the same idea as yours."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://letsswork.vercel.app/" />
        <meta property="og:title" content="Let's Work" />
        <meta
          property="og:description"
          content="Connect with people who are driven by the same idea as yours."
        />
        <meta
          name="image"
          property="og:image"
          content="https://letsswork.vercel.app/thumbnail.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://letsswork.vercel.app/" />
        <meta property="twitter:title" content="Let's Work" />
        <meta
          property="twitter:description"
          content="Connect with people who are driven by the same idea as yours."
        />
        <meta
          property="twitter:image"
          content="https://letsswork.vercel.app/thumbnail.png"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.css"
          integrity="sha512-DanfxWBasQtq+RtkNAEDTdX4Q6BPCJQ/kexi/RftcP0BcA4NIJPSi7i31Vl+Yl5OCfgZkdJmCqz+byTOIIRboQ=="
          crossOrigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <ChakraProvider theme={theme}>
        {isLoaded ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Skeleton h="100vh" />
        )}
      </ChakraProvider>
    </>
  );
};

export default wrapper.withRedux(appWithTranslation(App));
