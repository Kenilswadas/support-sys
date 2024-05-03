import React, { useEffect, useState } from "react";
import logo from "../../helpers/images/logo.png";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { auth } from "../../FirebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";

function Navbar({ viewLogin, setViewLogin, userName, setUserName }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleProfileHover = () => {
    setIsDropdownVisible(true);
  };

  const handleProfileLeave = () => {
    setIsDropdownVisible(false);
  };

  const handleLogout = () => {
    signOut(auth)
      .then((res) => {
        toast.success("Sign-out Successfully.");
        localStorage.clear();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(auth?.currentUser?.displayName);
      } else {
        setUserName(null);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.currentUser, userName]);
  return (
    <nav
      className={` flex items-center justify-center sticky top-0 text-[#003C43] font-semibold bg-[#E0ECE4] z-50`}
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
        <div className="flex items-center justify-around w-2/12 max-sm:hidden max-md:hidden relative ">
          <button
            className="flex items-center justify-around"
            onMouseEnter={handleProfileHover}
            onMouseLeave={handleProfileLeave}
          >
            <FaUser size={20} className="mr-1" />
            {userName
              ? userName
              : localStorage.getItem("userName")
              ? localStorage.getItem("userName")
              : auth?.currentUser
              ? auth?.currentUser?.displayName
              : "Profile"}
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
                {userName || auth?.currentUser ? (
                  <>
                    <li className=" w-full p-2 hover:bg-[#E0ECE4]">
                      View Profile
                    </li>
                    <div className="border-t-2 border-[#056674] w-full p-2 flex items-start justify-start">
                      <NavLink
                        onClick={() => {
                          handleLogout();
                        }}
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
  );
}

export default Navbar;
