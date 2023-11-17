import Navbar from "@/components/shared/Navbar";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <div
          className={`${inter.className} container py-5 flex flex-col space-y-2`}
        >
          <Navbar />
          <Component {...pageProps} />
        </div>
      </Provider>
    </SessionProvider>
  );
}
