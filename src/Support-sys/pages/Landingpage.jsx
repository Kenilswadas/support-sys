import React from "react";
import "../../../src/App.css";
import { FaQuora } from "react-icons/fa6";
import { MdMenuBook } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import Navbar from "../components/Navbar";
import LoginModel from "../components/LoginModel";
import { NavLink } from "react-router-dom";
import backimg from "../../helpers/images/jeshoots-com-sMKUYIasyDM-unsplash.jpg";
import { TypeAnimation } from "react-type-animation";
function LandingPage({ viewLogin, setViewLogin }) {
  const handleCloseLogin = () => {
    setViewLogin(!viewLogin);
  };
  const CURSOR_CLASS_NAME = "custom-type-animation-cursor";
  return (
    <div className="max-sm:w-full max-md:w-full">
      <Navbar viewLogin={viewLogin} setViewLogin={setViewLogin} />
      <div className="">
        <div>
          <img src={backimg} alt="" className="" />
        </div>
        <div className="">
          <h1 className="absolute top-1/2 max-md:top-3/4 max-sm:top-1/2 max-[300px]:hidden left-3/4 transform -translate-x-1/2 -translate-y-1/2 text-[#E3FEF7] font-semibold shadow-2xl">
            <TypeAnimation
              className="text-7xl  font-semibold  w-full text-center mt-8 max-md:text-lg"
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
        <h1 className="text-[#FF4B5C]  font-semibold text-5xl w-full text-center">
          Browse Help Topics
        </h1>
        <div className="flex items-center justify-around max-sm:flex-col ">
          <div className="w-3/12 max-md:w-3/4">
            <NavLink to={"/Onlinesupport"}>
              <div className="bg-white rounded-full w-fit relative top-10 left-32 p-8 z-10  max-md:left-40 max-sm:left-20">
                <FaQuora size={28} className="text-[#FF4B5C]" />
              </div>
              <div className="bg-[#E0ECE4] w-full h-auto shadow-2xl rounded-2xl p-6  text-[#056674] hover:text-[#FF4B5C]   duration-300 hover:-translate-y-2">
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
                  <p className="flex items-end mt-10 h-full text-2xl">
                    Explore more{" >> "}
                  </p>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="w-3/12 max-md:w-3/4">
            <NavLink to={"/Knowledgebased"}>
              <div className="bg-white rounded-full w-fit relative top-10 left-32 p-8 z-10 max-md:left-40 max-sm:left-20">
                <MdMenuBook size={28} className="text-[#FF4B5C]" />
              </div>
              <div className="bg-[#E0ECE4] w-full h-auto shadow-2xl rounded-2xl p-6 text-[#056674] hover:text-[#FF4B5C]     duration-300 hover:-translate-y-2">
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
                  <p className="flex items-end mt-10 h-full text-2xl">
                    Explore more{" >> "}
                  </p>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="w-3/12 max-md:w-3/4">
            <NavLink to={"SupportTicket"}>
              <div className="bg-white rounded-full w-fit relative top-10 left-32 p-8 z-10 max-md:left-40 max-sm:left-20">
                <BiSupport size={28} className="text-[#FF4B5C]" />
              </div>
              <div className="bg-[#E0ECE4] w-full h-auto shadow-2xl rounded-2xl p-6 text-[#056674] hover:text-[#FF4B5C]   duration-300 hover:-translate-y-2">
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
                  <p className="flex items-end mt-10 h-full text-2xl">
                    Explore more{" >> "}
                  </p>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center p-10 max-sm:flex-col max-md:flex-col w-full ">
        <h1 className="text-[#FF4B5C]  font-semibold text-3xl w-full text-center mt-2">
          WELCOME TO VEER ELECTRONICS PRIVATE LIMITED
        </h1>
        <p className="mt-4 w-5/6">
          We are Leading Indian manufacturer and Exporter of testing & measuring
          instruments for Electrical Industries. We have rich T&M experience
          with innovation and provide customers with the most reliable
          Instruments, Test Setup with solution and services with advanced
          technology.
        </p>
        <p className="mt-4 w-5/6">
          We offer products with high quality, aesthetic design, easy operation
          at reasonable price. Our product basket contains Precision Power
          Analyzer, Automatic Transformer Turns Ratio Meter, Automatic Digital
          Epstein Tester, Digital Iron Loss Tester, Core Loss Tester, High
          Voltage Tester, Automatic Oil BDV Tester, Transformer / Motor / Pump
          Testing Panel & Solutions, Holiday Detector etc.
        </p>
      </div>
      {viewLogin ? (
        <LoginModel handleCloseLogin={handleCloseLogin} title={"Login"} />
      ) : null}
    </div>
  );
}

export default LandingPage;
