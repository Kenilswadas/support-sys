import React, { useEffect, useState } from "react";
import logo from "../../helpers/images/logo.png";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { GrTextAlignRight } from "react-icons/gr";

function Navbar({ viewLogin, setViewLogin }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [toggleView, setToggleView] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <nav
        className={`bg-${
          scrollPosition === 0 ? "transparent text-[#FF4B5C]" : "top"
        } flex items-center justify-center sticky top-0 text-[#003C43] font-semibold bg-[#E0ECE4] z-50`}
      >
        <ul className="flex items-center justify-around w-full p-4 max-md:flex-col ">
          <div className="">
            <li>
              <img src={logo} alt="logo" className="h-10" />
            </li>
          </div>
          <div className="flex items-center justify-around w-4/12 max-md:flex-col">
            <li>
              <NavLink
                to={"/"}
                activeClassName="bg-gray-700 p-2 w-full"
                className=" p-2 w-full hover:border-b-4 hover:border-[#FF4B5C] duration-300 "
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/about"}
                activeClassName="bg-gray-700 p-2 w-full"
                className=" p-2 w-full hover:border-b-4 hover:border-[#FF4B5C] duration-300"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/contact"}
                activeClassName="bg-gray-700 p-2 w-full"
                className=" p-2 w-full hover:border-b-4 hover:border-[#FF4B5C] duration-300"
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/services"}
                activeClassName="bg-gray-700 p-2 w-full"
                className=" p-2 w-full hover:border-b-4 hover:border-[#FF4B5C] duration-300"
              >
                Services
              </NavLink>
            </li>
          </div>
          <div className="flex items-center justify-around w-2/12 max-sm:hidden max-md:hidden">
            <button className="flex items-center justify-around ">
              <FaUser size={20} className="mr-1" />
              Profile
            </button>
            <button
              onClick={() => {
                setViewLogin(!viewLogin);
              }}
            >
              Login
            </button>
          </div>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
