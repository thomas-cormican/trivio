import { useEffect } from "react";
import "@/styles/globals.css";
import Layout from "@/components/Layout/Layout";

export default function App({ Component, pageProps }) {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, []);

  // Whenever the user explicitly chooses light mode
  // localStorage.theme = "light";

  // Whenever the user explicitly chooses dark mode
  // localStorage.theme = "dark";

  // Whenever the user explicitly chooses to respect the OS preference
  // localStorage.removeItem("theme");

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
