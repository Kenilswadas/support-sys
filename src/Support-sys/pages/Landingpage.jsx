import React, { useContext, useEffect } from "react";
import "../../../src/App.css";
import { FaQuora } from "react-icons/fa6";
import { MdMenuBook } from "react-icons/md";
import { BiChevronRight, BiSupport } from "react-icons/bi";
import LoginModel from "../components/LoginModel";
import { NavLink, useNavigate } from "react-router-dom";
import backimg from "../../helpers/images/jeshoots-com-sMKUYIasyDM-unsplash.jpg";
import { TypeAnimation } from "react-type-animation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import Navbar from "../../helpers/Navbar";
import { LoginContext, UserContext } from "../../App";

function LandingPage({ setIsloading, isLoading }) {
  const { userName, setUserName } = useContext(UserContext);
  const { viewLogin, setViewLogin } = useContext(LoginContext);

  const handleCloseLogin = () => {
    setViewLogin(!viewLogin);
  };
  const CURSOR_CLASS_NAME = "custom-type-animation-cursor";
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email === "admin@gmail.com") {
          navigate("/adminDashboard");
        }
        navigate("/UserDashboard");
      } else navigate("/");
    });
  }, [navigate]);
  return (
    <div className="max-sm:w-full max-md:w-full">
      <Navbar
        viewLogin={viewLogin}
        setViewLogin={setViewLogin}
        userName={userName}
        setUserName={setUserName}
      />
      <div className="relative">
        <div>
          <img src={backimg} alt="Background" className="w-full" />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-[#E3FEF7] font-semibold shadow-2xl">
          <h1 className="text-5xl md:text-7xl max-md:text-lg">
            <TypeAnimation
              className="font-semibold"
              cursor={false}
              sequence={[
                "Get help with the",
                800,
                "Advanced Support",
                (el) => el.classList.remove(CURSOR_CLASS_NAME),
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
            <NavLink to={"/Onlinesupport"} className="block">
              <div className="bg-white rounded-full w-fit relative top-10 left-32 p-8 z-10 max-md:left-40 max-sm:left-20">
                <FaQuora size={28} className="text-[#FF4B5C]" />
              </div>
              <div className="bg-[#E0ECE4] w-full h-auto shadow-2xl rounded-2xl p-6  text-[#056674] hover:text-[#FF4B5C]   duration-300 hover:-translate-y-2">
                <h1 className="text-3xl font-semibold  w-full text-center mt-8 mb-8">
                  Online Support
                </h1>
                <p className="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                  ea nemo, fugit architecto nobis quasi fugiat ratione rerum
                  repudiandae consequuntur sequi! Deleniti, dolores incidunt
                  itaque voluptates eveniet veniam vero assumenda?
                </p>
                <div className="flex justify-end items-center mt-6">
                  <span className="text-[#056674] text-xl font-semibold">
                    Explore more
                  </span>
                  <BiChevronRight className="ml-2 text-[#056674] text-xl" />
                </div>
              </div>
            </NavLink>
          </div>
          <div className="w-3/12 max-md:w-3/4">
            <NavLink to={"/Knowledgebased"} className="block">
              <div className="bg-white rounded-full w-fit relative top-10 left-32 p-8 z-10 max-md:left-40 max-sm:left-20">
                <MdMenuBook size={28} className="text-[#FF4B5C]" />
              </div>
              <div className="bg-[#E0ECE4] w-full h-auto shadow-2xl rounded-2xl p-6 text-[#056674] hover:text-[#FF4B5C]     duration-300 hover:-translate-y-2">
                <h1 className="text-3xl font-semibold  w-full text-center mt-8 mb-8">
                  Knowledge based
                </h1>
                <p className="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                  ea nemo, fugit architecto nobis quasi fugiat ratione rerum
                  repudiandae consequuntur sequi! Deleniti, dolores incidunt
                  itaque voluptates eveniet veniam vero assumenda?
                </p>
                <div className="flex justify-end items-center mt-6">
                  <span className="text-[#056674] text-xl font-semibold">
                    Explore more
                  </span>
                  <BiChevronRight className="ml-2 text-[#056674] text-xl" />
                </div>
              </div>
            </NavLink>
          </div>
          <div className="w-3/12 max-md:w-3/4">
            <NavLink to={"SupportTicket"} className="block">
              <div className="bg-white rounded-full w-fit relative top-10 left-32 p-8 z-10 max-md:left-40 max-sm:left-20">
                <BiSupport size={28} className="text-[#FF4B5C]" />
              </div>
              <div className="bg-[#E0ECE4] w-full h-auto shadow-2xl rounded-2xl p-6 text-[#056674] hover:text-[#FF4B5C] duration-300 hover:-translate-y-2">
                <h1 className="text-3xl font-semibold text-center mt-8 mb-8">
                  Support Ticket
                </h1>
                <p className="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                  ea nemo, fugit architecto nobis quasi fugiat ratione rerum
                  repudiandae consequuntur sequi! Deleniti, dolores incidunt
                  itaque voluptates eveniet veniam vero assumenda?
                </p>
                <div className="flex justify-end items-center mt-6">
                  <span className="text-[#056674] text-xl font-semibold">
                    Explore more
                  </span>
                  <BiChevronRight className="ml-2 text-[#056674] text-xl" />
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
        <LoginModel
          handleCloseLogin={handleCloseLogin}
          title={"Login"}
          setUserName={setUserName}
          isLoading={isLoading}
          setIsloading={setIsloading}
        />
      ) : null}
    </div>
  );
}

export default LandingPage;
