import React, { useState } from "react";
import Navbar from "./components/Navbar";
import VericalNavbar from "./components/VericalNavbar";
import SupportTicketTable from "./components/Tables/SupportTicketTable";
function Tickets({ Ticket }) {
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
          <SupportTicketTable Ticket={Ticket} />
        </div>
      </div>
    </div>
  );
}

export default Tickets;
