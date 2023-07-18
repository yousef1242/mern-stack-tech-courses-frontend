import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { Provider } from "react-redux";
import { store } from "@/store";
import { Toaster } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </Provider>
    </>
  );
}
