import { SessionProvider } from "next-auth/react";
import "../../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className="container m-auto p-8 relative h-screen">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
