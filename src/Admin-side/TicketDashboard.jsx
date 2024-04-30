import React from "react";
import Navbar from "../Support-sys/components/Navbar";
import SupportTicketTable from "../Tables/SupportTicketTable";
function TicketDashboard({ Ticket }) {
  return (
    <div className="max-sm:w-full max-md:w-full">
      <Navbar />
      <div className="bg-white flex flex-col overflow-auto items-center justify-center  w-full">
        <SupportTicketTable Ticket={Ticket} />
      </div>
    </div>
  );
}

export default TicketDashboard;
