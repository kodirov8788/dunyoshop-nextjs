/* eslint-disable react/jsx-no-undef */
import "../styles/globals.css";
import { Suspense } from "react";
import Layout from "../components/Layout";
import { DataProvider } from "../store/GlobalState";
import React from "react";
function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      {/* <Suspense fallback={<div>Loading</div>}> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* </Suspense> */}
    </DataProvider>
  );
}

export default MyApp;
