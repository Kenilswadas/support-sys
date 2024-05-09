import React from "react";
import { BsPeopleFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IoTicket } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";
import { NavLink } from "react-router-dom";

function VericalNavbar({ ToggleView, setToggleView }) {
  return (
    <>
      <nav
        className={`absolute ${
          ToggleView ? `w-24` : `w-1/6`
        } bg-white shadow-2xl h-screen text-[#003C43] flex flex-col  justify-between `}
      >
        <ul className="flex flex-col w-full p-4">
          <div className="flex justify-end w-full mb-2">
            <button
              onClick={() => {
                setToggleView(!ToggleView);
              }}
            >
              {ToggleView ? (
                <IoIosArrowDropright size={28} />
              ) : (
                <IoIosArrowDropleft size={28} />
              )}
            </button>
          </div>
          <li
            className={` hover:bg-[#E0ECE4]  w-full flex items-start  ${
              ToggleView
                ? ` rounded-md `
                : `hover:border hover:border-[#056674] rounded-md`
            }`}
          >
            <NavLink
              to={"/adminDashboard"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? `flex w-full bg-[#E0ECE4] p-2  rounded-md border-b-2 border-[#056674] `
                    : `flex w-full p-2`
                }`
              }
            >
              <LuLayoutDashboard className="mr-4" size={20} />{" "}
              {ToggleView ? null : "Dashboard"}
            </NavLink>
          </li>
          <li
            className={` hover:bg-[#E0ECE4]  w-full flex items-start  ${
              ToggleView
                ? ` rounded-md `
                : `hover:border hover:border-[#056674] rounded-md`
            }`}
          >
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? `flex w-full bg-[#E0ECE4] p-2  rounded-md border-b-2 border-[#056674] `
                    : `flex w-full p-2`
                }`
              }
            >
              <CgProfile className="mr-4" size={20} />{" "}
              {ToggleView ? null : "Profile"}
            </NavLink>
          </li>
          <li
            className={` hover:bg-[#E0ECE4]  w-full flex items-start  ${
              ToggleView
                ? ` rounded-md `
                : `hover:border hover:border-[#056674] rounded-md`
            }`}
          >
            <NavLink
              to={"/Ticket"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? `flex w-full bg-[#E0ECE4] p-2  rounded-md border-b-2 border-[#056674] `
                    : `flex w-full p-2`
                }`
              }
            >
              <IoTicket className="mr-4" size={20} />{" "}
              {ToggleView ? null : "Ticket"}
            </NavLink>
          </li>
          <li
            className={` hover:bg-[#E0ECE4]  w-full flex items-start  ${
              ToggleView
                ? ` rounded-md `
                : `hover:border hover:border-[#056674] rounded-md`
            }`}
          >
            <NavLink
              to={"/Products"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? `flex w-full bg-[#E0ECE4] p-2  rounded-md border-b-2 border-[#056674] `
                    : `flex w-full p-2`
                }`
              }
            >
              <MdOutlineCategory className="mr-4" size={20} />{" "}
              {ToggleView ? null : `Products`}
            </NavLink>
          </li>
          <li
            className={` hover:bg-[#E0ECE4]  w-full flex items-start  ${
              ToggleView
                ? ` rounded-md `
                : `hover:border hover:border-[#056674] rounded-md`
            }`}
          >
            <NavLink
              to={"/Customers"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? `flex w-full bg-[#E0ECE4] p-2  rounded-md border-b-2 border-[#056674] `
                    : `flex w-full p-2`
                }`
              }
            >
              <BsPeopleFill className="mr-4" size={20} />{" "}
              {ToggleView ? null : "Customers"}
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default VericalNavbar;
