import React, { useState } from "react";
import VericalNavbar from "./components/VericalNavbar";
import Navbar from "../Admin-side/components/Navbar.jsx";
function Dashboard({ Ticket }) {
  const [ToggleView, setToggleView] = useState(false);
  return (
    <div className="max-sm:w-full max-md:w-full">
      <Navbar />
      <VericalNavbar ToggleView={ToggleView} setToggleView={setToggleView} />
      <div className="flex w-full h-screen p-4 overflow-auto ">
        <div
          className={`bg-[#E0ECE4] w-full p-4 ${
            ToggleView ? `ml-24` : `ml-64`
          }`}
        >
          <div className="grid grid-cols-3">
            <div className="bg-white rounded-lg h-28 m-2 p-4">
              <h1 className="w-full text-2xl text-[#056674]">Active Tickets</h1>
              <div className="w-full text-4xl font-bold text-[#056674] mt-4 flex items-center justify-center ">
                11
              </div>
            </div>
            <div className="bg-white rounded-lg h-28 m-2 p-4">
              <h1 className="w-full text-2xl text-[#056674]">
                Pending Tickets
              </h1>
              <div className="w-full text-4xl font-bold text-[#056674] mt-4 flex items-center justify-center ">
                2
              </div>
            </div>
            <div className="bg-white rounded-lg h-28 m-2 p-4">
              <h1 className="w-full text-2xl text-[#056674]">
                Completed Tickets
              </h1>
              <div className="w-full text-4xl font-bold text-[#056674] mt-4 flex items-center justify-center ">
                20
              </div>
            </div>
            <div className="bg-white rounded-lg h-28 m-2 p-4">
              <h1 className="w-full text-2xl text-[#056674]">Customers</h1>
              <div className="w-full text-4xl font-bold text-[#056674] mt-4 flex items-center justify-center ">
                200
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
