import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "../components/Header/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen bg-container">
      <Header />
      <div className="pt-14">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
