import React from "react";
import Link from "next/link";
import { BsFillSunFill } from "react-icons/bs";
import Image from "next/image";
import Logo from "../../assets/logo.png";

function Navbar() {
  const changeTheme = () => {
    console.log("changing theme");
    if (localStorage.theme === "dark") {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    } else if (localStorage.theme === "light") {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <div className="w-full bg-bgLight">
      <nav className="max-w-4xl flex justify-between items-center p-4 text-xl w-full m-auto">
        <div>
          <Link href="/">
            <Image className="w-24" src={Logo} />
          </Link>
        </div>
        <div className="flex items-center text-lg">
          {/* <Link className="text-tealDark" href="/about">
            About
          </Link> */}
          <div
            onClick={changeTheme}
            className="flex items-center text-2xl text-teal translate-y-px ml-2 hover:cursor-pointer"
          >
            <BsFillSunFill />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
