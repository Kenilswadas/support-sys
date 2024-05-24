import React, { useContext, useEffect, useState } from "react";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { LoginContext, TicketStatusContext, UserContext } from "../App";
import { auth, db } from "../FirebaseConfig";
import Navbar from "../helpers/Navbar";
import VerticalNavbar from "./components/VerticalNavbar";
import SquareBtn from "../Support-sys/components/SquareBtn";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import AddTickets from "./components/Form/AddTicketsForm";
import UserTicketsTable from "./components/Tables/UserTicketsTable";
function UserTickets() {
  const { userName, setUserName } = useContext(UserContext);
  const { viewLogin, setViewLogin } = useContext(LoginContext);
  const [allTickets, setAllTickets] = useState([]);
  const [ToggleView, setToggleView] = useState(false);
  const [openupdate, setOpenupdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [id, setId] = useState(null);
  const [viewFilter, setViewFilter] = useState(false);
  const [AddTicketForm, setShowAddTicketForm] = useState(false);
  const { TicketStatus } = useContext(TicketStatusContext);

  useEffect(() => {
    handleStatusChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const alldata = snap.docs.map((e) => ({
        id: e.id,
        ...e.data(),
      }));
      const currentUserTickets = alldata.filter(
        (data) => data.UserEmail === auth?.currentUser?.email
      );
      if (status !== "clear" && status) {
        const filtereddata = currentUserTickets.filter(
          (data) => data.Status === status
        );
        setAllTickets(filtereddata);
      } else if (TicketStatus !== null && status !== "clear") {
        const filtereddata = currentUserTickets.filter(
          (data) => data.Status === TicketStatus
        );
        setAllTickets(filtereddata);
      } else if (status === "clear") {
        setAllTickets(currentUserTickets);
      } else {
        const alldata = snap.docs.map((e) => ({
          id: e.id,
          ...e.data(),
        }));
        setAllTickets(currentUserTickets);
      }
    });
  };

  return (
    <div className="max-sm:w-full max-md:w-full dark:bg-[#0f161b]">
      <Navbar
        viewLogin={viewLogin}
        setViewLogin={setViewLogin}
        userName={userName}
        setUserName={setUserName}
      />
      <VerticalNavbar ToggleView={ToggleView} setToggleView={setToggleView} />
      <ToastContainer />
      <div className="flex w-full h-screen p-4 overflow-auto ">
        <div
          className={`bg-[#E0ECE4] dark:bg-[#040D12] w-full p-4 ${
            ToggleView ? `ml-24` : `ml-64`
          }`}
        >
          {AddTicketForm ? (
            <AddTickets
              AddTicketForm={AddTicketForm}
              setShowAddTicketForm={setShowAddTicketForm}
            />
          ) : null}
          <div>
            <SquareBtn
              name={"Add Ticket"}
              faicon={<HiOutlineViewGridAdd size={22} />}
              type={"button"}
              clickFunction={() => setShowAddTicketForm(!AddTicketForm)}
            />
          </div>
          <UserTicketsTable
            Ticket={allTickets}
            handleUpdateView={handleUpdateView}
            handleStatusChange={handleStatusChange}
            openupdate={openupdate}
            setOpenupdate={setOpenupdate}
            selectedProduct={selectedProduct}
            handleUpdate={handleUpdate}
            id={id}
            setViewFilter={setViewFilter}
            viewFilter={viewFilter}
          />
        </div>
      </div>
    </div>
  );
}

export default UserTickets;
