import Head from "next/head";
// import Image from "next/image";
import React from "react";
import Home from "../pages/home";

function App() {
  return (
    <>
      <Head>
        <title>Art by Ylva Landoff Lindberg</title>
        <meta name='description' content='Art by Ylva Landoff Lindberg' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
      </Head>
      <Home />
    </>
  );
}

export default App;
