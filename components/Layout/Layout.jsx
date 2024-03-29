import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Head from "next/head";

function Layout({ children }) {
  const navHeight = 100;
  const footerHeight = 100;
  return (
    <>
      <Head>
        <title>Trivio</title>
        <meta name="description" content="Trivio trivia app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-black dark:text-white flex flex-col items-center justify-between min-h-screen ">
        <Navbar height={navHeight} />
        <main className={`flex flex-auto p-4 max-w-4xl w-full`}>
          {children}
        </main>
        <Footer height={footerHeight} />
      </div>
    </>
  );
}

export default Layout;
