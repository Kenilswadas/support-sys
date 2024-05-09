import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import VericalNavbar from "./components/VericalNavbar";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import TicketsTable from "./components/Tables/TicketTable";
import { toast } from "react-toastify";
function Tickets({ Ticket }) {
  const [allTickets, setAllTickets] = useState([]);
  const [ToggleView, setToggleView] = useState(false);
  const [openupdate, setOpenupdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [id, setId] = useState(null);
  useEffect(() => {
    handleStatusChange();
  }, []);
  const handleUpdateView = (id) => {
    setOpenupdate(!openupdate);
    const selectedProduct = allTickets.find((data) => data.id === id);
    setSelectedProduct(selectedProduct);
    // handleUpdate(id);
    setId(id);
  };
  const handleUpdate = (id, selectedStatus) => {
    updateDoc(doc(db, "Tickets", id), {
      ...selectedProduct,
      Status: selectedStatus,
    })
      .then((res) => {
        toast.success("Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  const handleStatusChange = (status) => {
    onSnapshot(collection(db, "Tickets"), (snap) => {
      if (status) {
        const alldata = snap.docs.map((e) => ({
          id: e.id,
          ...e.data(),
        }));
        console.log(alldata);
        const filtereddata = alldata.filter((data) => data.Status == status);
        console.log(filtereddata);
        setAllTickets(filtereddata);
      } else {
        const alldata = snap.docs.map((e) => ({
          id: e.id,
          ...e.data(),
        }));
        setAllTickets(alldata);
      }
    });
  };
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
          <TicketsTable
            Ticket={allTickets}
            handleUpdateView={handleUpdateView}
            handleStatusChange={handleStatusChange}
            openupdate={openupdate}
            setOpenupdate={setOpenupdate}
            selectedProduct={selectedProduct}
            handleUpdate={handleUpdate}
            id={id}
          />
        </div>
      </div>
    </div>
  );
}

export default Tickets;
