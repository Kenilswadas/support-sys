import React, { useEffect, useState } from "react";
import logo from "../../helpers/images/logo.png";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";

function Navbar({ viewLogin, setViewLogin }) {
  const [scrollPosition, setScrollPosition] = useState(0);
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
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleProfileHover = () => {
    setIsDropdownVisible(true);
  };

  const handleProfileLeave = () => {
    setIsDropdownVisible(false);
  };
  const [userName, setUserName] = useState();
  const username = JSON.parse(localStorage.getItem("SignupData"));
  useEffect(() => {
    username && setUserName(username.name);
  }, [username]);
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
          {/* <div className="flex items-center justify-around w-2/12 max-sm:hidden max-md:hidden">
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
          </div> */}
          <div className="flex items-center justify-around w-2/12 max-sm:hidden max-md:hidden relative ">
            <button
              className="flex items-center justify-around"
              onMouseEnter={handleProfileHover}
              onMouseLeave={handleProfileLeave}
            >
              <FaUser size={20} className="mr-1" />
              {userName ? userName : "Profile"}
            </button>

            {isDropdownVisible && (
              <div
                className="absolute top-full  left-0 bg-white p-2 rounded-md shadow-md w-full text-[#056674]"
                onMouseEnter={handleProfileHover}
                onMouseLeave={handleProfileLeave}
              >
                <p>Welcome </p>
                <p className="text-xs">To access account and manage Tickets</p>
                <ul className="flex flex-col items-center justify-center text-center">
                  {userName ? (
                    <>
                      <li className=" w-full p-2 hover:bg-[#E0ECE4]">
                        View Profile
                      </li>
                      <div className="border-t-2 border-[#056674] w-full p-2 flex items-start justify-start">
                        <NavLink
                          className={
                            "p-2 flex items-center justify-center hover:bg-[#E0ECE4] hover:border border-[#056674]"
                          }
                        >
                          Log Out <IoLogOut size={20} className="ml-2" />
                        </NavLink>
                      </div>
                    </>
                  ) : (
                    <>
                      <li className=" w-full p-2 hover:bg-[#E0ECE4]">
                        View Profile
                      </li>
                      <div className="border-t-2 border-[#056674] w-full p-2 flex items-start justify-start">
                        <NavLink
                          onClick={() => {
                            setViewLogin(!viewLogin);
                          }}
                          className={
                            "p-2 hover:bg-[#E0ECE4] hover:border border-[#056674]"
                          }
                        >
                          Login / SignUp
                        </NavLink>
                      </div>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
