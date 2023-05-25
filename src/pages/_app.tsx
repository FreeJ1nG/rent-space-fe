import "@/styles/globals.css";
import type { AppProps } from "next/app";
import store from "@/modules/redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { AuthContextProvider } from "@/common/contexts/authContext";
import Navbar from "@/common/components/navbar/Navbar";
import { ChildrenProps, useEffect } from "react";
import { useRouter } from "next/router";
import { PATH_AUTH } from "@/common/routes/path";
import { useAuthContext } from "@/common/contexts/authContext";
import { Box } from "@mui/material";
import useIsRendered from "@/common/hooks/useIsRendered";
import Head from "next/head";

const LoginGuard = ({ children }: ChildrenProps) => {
  const isRendered = useIsRendered();
  const { isAuthenticated } = useAuthContext() || {};
  const router = useRouter();

  useEffect(() => {
    if (!isRendered) return;
    if (
      !isAuthenticated &&
      router.pathname !== PATH_AUTH.login &&
      router.pathname !== PATH_AUTH.register
    ) {
      router.push(PATH_AUTH.login);
    }
  }, [isAuthenticated, router, isRendered]);

  return <Box>{children}</Box>;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Rent Space</title>
      </Head>
      <ReduxProvider store={store}>
        <AuthContextProvider>
          <LoginGuard>
            <div className="relative">
              <Navbar />
              <div className="h-20" />
              <Component {...pageProps} />
            </div>
          </LoginGuard>
        </AuthContextProvider>
      </ReduxProvider>
    </>
  );
}
