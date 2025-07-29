import React from "react";
import { FaSquareInstagram, FaYoutube, FaSpotify } from "react-icons/fa6";

const Nav = () => {
  return (
    <nav className="h-[10vh] champagne p-5 flex justify-between items-center gap-2">
      <ul className="flex justify-start w-1/4 gap-5">
        <li>Home</li>
        <li>Episodes</li>
        <li>Contact</li>
      </ul>
      <div>{/* <img src="" alt="" /> */}</div>
      <ul className="flex justify-end w-1/4 gap-5">
        <li>
          <FaSquareInstagram />
        </li>
        <li>
          <FaYoutube />
        </li>
        <li>
          <FaSpotify />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
