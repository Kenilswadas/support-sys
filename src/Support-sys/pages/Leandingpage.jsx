import React, { useState } from "react";
import "../../../src/App.css";
import { IoSearch } from "react-icons/io5";
import { FaQuora } from "react-icons/fa6";
import { MdMenuBook } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import Navbar from "../components/Navbar";
import LoginModel from "../components/LoginModel";
import { NavLink } from "react-router-dom";
import animationData from "../../helpers/images/Animation - 1713505056888.json";
import Lottie from "react-lottie";
import { Bgimage } from "../../helpers/Bgimage";
import backimg from "../../helpers/images/jeshoots-com-sMKUYIasyDM-unsplash.jpg";
import { TypeAnimation } from "react-type-animation";
function LandingPage() {
  const handleLogin = () => {};
  const CURSOR_CLASS_NAME = "custom-type-animation-cursor";

  return (
    <div className="max-sm:w-full max-md:w-full">
      <Navbar />
      <div className="">
        <div>
          <img src={backimg} alt="" className="" />
        </div>
        <div className="">
          <h1 className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 text-[#E3FEF7] font-semibold text-4xl z-50 shadow-2xl">
            <TypeAnimation
              className="text-7xl font-semibold  w-full text-center mt-8"
              cursor={false}
              sequence={[
                "Get help with the",
                800,
                "Get help with the Advanced Support",
                (el) => el.classList.remove(CURSOR_CLASS_NAME), // A reference to the element gets passed as the first argument of a callback function
                6000,
                (el) => el.classList.add(CURSOR_CLASS_NAME),
                "",
              ]}
              repeat={Infinity}
            />
          </h1>
        </div>
      </div>
      <div className=" relative w-auto mt-5 h-auto ">
        <h1 className="text-[#003C43]  font-semibold text-5xl w-full text-center">
          Browse Help Topics
        </h1>
        <div className="flex items-center justify-around m-10 max-sm:flex-col max-md:flex-col ">
          <div className="w-3/12 max-md:w-3/4">
            <NavLink to={"/Onlinesupport"}>
              <div className="bg-white rounded-full w-fit relative top-10 left-32 p-8 z-10 ">
                <FaQuora size={28} />
              </div>
              <div className="bg-[#003C43] w-full h-96 shadow-2xl rounded-2xl p-6 hover:bg-[#77B0AA] text-[#E3FEF7] hover:text-[#003C43]   duration-300 hover:-translate-y-2">
                <h1 className="text-3xl font-semibold  w-full text-center mt-8 mb-8">
                  Online Support
                </h1>

                <div>
                  <p className="text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Totam ea nemo, fugit architecto nobis quasi fugiat ratione
                    rerum repudiandae consequuntur sequi! Deleniti, dolores
                    incidunt itaque voluptates eveniet veniam vero assumenda?
                  </p>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="w-3/12 max-md:w-3/4">
            <NavLink to={"Knowledgebased"}>
              <div className="bg-white rounded-full w-fit relative top-10 left-32 p-8 z-10">
                <MdMenuBook size={28} />
              </div>
              <div className="bg-[#003C43] w-full h-96 shadow-2xl rounded-2xl p-6 hover:bg-[#77B0AA] text-[#E3FEF7] hover:text-[#003C43]   duration-300 hover:-translate-y-2">
                <h1 className="text-3xl font-semibold  w-full text-center mt-8 mb-8">
                  Knowledge based
                </h1>
                <div>
                  <p className="text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Totam ea nemo, fugit architecto nobis quasi fugiat ratione
                    rerum repudiandae consequuntur sequi! Deleniti, dolores
                    incidunt itaque voluptates eveniet veniam vero assumenda?
                  </p>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="w-3/12 max-md:w-3/4">
            <NavLink to={"SupportTicket"}>
              <div className="bg-white rounded-full w-fit relative top-10 left-32 p-8 z-10">
                <BiSupport size={28} />
              </div>
              <div className="bg-[#003C43] w-full h-96 shadow-2xl rounded-2xl p-6 hover:bg-[#77B0AA] text-[#F1F6F9] hover:text-[#003C43]   duration-300 hover:-translate-y-2">
                <h1 className="text-3xl font-semibold  w-full text-center mt-8 mb-8">
                  Support Ticket
                </h1>
                <div>
                  <p className="text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Totam ea nemo, fugit architecto nobis quasi fugiat ratione
                    rerum repudiandae consequuntur sequi! Deleniti, dolores
                    incidunt itaque voluptates eveniet veniam vero assumenda?
                  </p>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
