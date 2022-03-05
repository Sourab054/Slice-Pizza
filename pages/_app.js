import Layout from "../components/Layout";
import "../styles/globals.css";
import store from "../redux/store";
import { Provider } from "react-redux";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import { AnimatePresence } from "framer-motion";

const progress = new ProgressBar({
  size: 3,
  delay: 100,
  color: "#ff0202",
  className: "z-50",
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} />
        </AnimatePresence>
      </Layout>
    </Provider>
  );
}

export default MyApp;
