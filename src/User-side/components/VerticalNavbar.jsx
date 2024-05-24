import React from "react";
import { BsPeopleFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IoTicket } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";
import { NavLink } from "react-router-dom";

function VerticalNavbar({ ToggleView, setToggleView }) {
  return (
    <nav
      className={`fixed ${
        ToggleView ? "w-24" : "w-48 md:w-1/6"
      } bg-white dark:bg-gray-800 shadow-2xl h-full text-[#003C43] dark:text-gray-200 flex flex-col justify-between transition-width duration-300`}
    >
      <div className="flex flex-col items-center p-4">
        <button
          onClick={() => setToggleView(!ToggleView)}
          className="self-end mb-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300"
        >
          {ToggleView ? (
            <IoIosArrowDropright size={28} />
          ) : (
            <IoIosArrowDropleft size={28} />
          )}
        </button>
        <ul className="w-full space-y-2">
          {[
            {
              to: "/UserDashboard",
              icon: <LuLayoutDashboard size={20} />,
              label: "Dashboard",
            },
            {
              to: "/UserProfile",
              icon: <CgProfile size={20} />,
              label: "Profile",
            },
            {
              to: "/UserTickets",
              icon: <IoTicket size={20} />,
              label: "Tickets",
            },
            {
              to: "/ImmediateUserSupport",
              icon: <MdOutlineCategory size={20} />,
              label: "Immediate Support",
            },
            {
              to: "/UserVideoSolutions",
              icon: <BsPeopleFill size={20} />,
              label: "Video Solutions",
            },
          ].map((item, index) => (
            <li key={index} className="w-full">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-md transition-colors duration-300 ${
                    isActive
                      ? "bg-[#E0ECE4] dark:bg-gray-700 border-b-2 border-[#056674]"
                      : "hover:bg-[#E0ECE4] dark:hover:bg-gray-700 hover:border hover:border-[#056674]"
                  }`
                }
              >
                {item.icon}
                {!ToggleView && (
                  <span className="ml-4 text-sm font-medium">{item.label}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default VerticalNavbar;
