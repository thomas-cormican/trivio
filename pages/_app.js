import { useEffect } from "react";
import "@/styles/globals.css";
import Layout from "@/components/Layout/Layout";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC

  // Whenever the user explicitly chooses light mode
  // localStorage.theme = "light";

  // Whenever the user explicitly chooses dark mode
  // localStorage.theme = "dark";

  // Whenever the user explicitly chooses to respect the OS preference
  // localStorage.removeItem("theme");

  return (
    <Layout>
      <Script src="/theme.js" strategy="beforeInteractive" />
      <Component {...pageProps} />
    </Layout>
  );
}
