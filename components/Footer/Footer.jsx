import React from "react";

function Footer() {
  return (
    <footer className="p-4 w-full text-sm text-grey text-center bg-bgLight">
      Powered by{" "}
      <a
        className="text-teal hover:text-tealDark"
        href="https://the-trivia-api.com/"
      >
        The Trivia API
      </a>
    </footer>
  );
}

export default Footer;
