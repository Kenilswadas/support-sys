import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../FirebaseConfig";
import logo from "../../helpers/images/logo.png";
import { FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";

function Navbar() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();
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
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <>
      <nav
        className={`flex items-center justify-center sticky top-0 text-[#003C43] font-semibold bg-[#E0ECE4] z-50 border-b border-[#003C43]`}
      >
        <ul className="flex items-center justify-between w-full p-4 max-md:flex-col ">
          <div className="">
            <li>
              <img src={logo} alt="logo" className="h-10" />
            </li>
          </div>
          <div className="flex items-center justify-around w-2/12 max-sm:hidden max-md:hidden relative">
            <button
              className="flex items-center justify-around"
              onMouseEnter={handleProfileHover}
              onMouseLeave={handleProfileLeave}
            >
              <FaUser size={20} className="mr-1" />
              {auth?.currentUser?.displayName || "Profile"}
            </button>
            {isDropdownVisible && (
              <div
                className="absolute top-full  left-0 bg-white p-2 rounded-md shadow-md w-full"
                onMouseEnter={handleProfileHover}
                onMouseLeave={handleProfileLeave}
              >
                <p>Welcome </p>
                <p className="text-xs">To access account and manage Tickets</p>
                <ul className="flex flex-col items-center justify-center text-center">
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
