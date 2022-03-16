import "../styles/globals.css";
import type { AppProps } from "next/app";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Header } from "../components/Header/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="p-d-flex p-flex-column">
      <Header />
      <div style={{ padding: "3.375rem 0 0 0" }}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
