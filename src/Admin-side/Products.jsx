import React, { useState, useEffect, useContext } from "react";
import VericalNavbar from "./components/VerticalNavbar.jsx";
import SquareBtn from "../Support-sys/components/SquareBtn.jsx";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../FirebaseConfig.jsx";
import ProductDetailTable from "./components/Tables/ProductDetailTable.jsx";
import UpdateProductForm from "./components/Model/UpdateProductForm.jsx";
import AddProductsForm from "./components/Form/AddProductsForm.jsx";
import Navbar from "../helpers/Navbar.jsx";
import { LoginContext, UserContext } from "../App.js";
import Swal from "sweetalert2";
function Products() {
  const { userName, setUserName } = useContext(UserContext);
  const { viewLogin, setViewLogin } = useContext(LoginContext);
  const [ToggleView, setToggleView] = useState(false);
  const [CategoryForm, setShowCategoryForm] = useState(false);
  const [allusers, setAllusers] = useState([]);
  const [view, setView] = useState(false);
  const [openupdate, setOpenupdate] = useState(false);
  const [id, setId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "Products"), (snap) => {
      const alldata = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllusers(alldata);
    });
  }, []);
  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDoc(doc(db, "Products", id));
        Swal.fire({
          title: "Deleted!",
          text: "Your Product has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const OpenUpdateModel = (id) => {
    const handleSelectedProduct = allusers.find((data) => data.id === id);
    setSelectedProduct(handleSelectedProduct);
    setOpenupdate(!openupdate);
    setId(id);
  };
  return (
    <div className="max-sm:w-full max-md:w-full dark:bg-[#0f161b]">
      <Navbar
        viewLogin={viewLogin}
        setViewLogin={setViewLogin}
        userName={userName}
        setUserName={setUserName}
      />
      <VericalNavbar ToggleView={ToggleView} setToggleView={setToggleView} />

      <div className="flex w-full h-screen p-4 overflow-auto ">
        <div
          className={`bg-[#E0ECE4] dark:bg-[#040D12]   w-full p-4 ${
            ToggleView ? `ml-24` : `ml-64 `
          }`}
        >
          {CategoryForm ? (
            <AddProductsForm
              CategoryForm={CategoryForm}
              setShowCategoryForm={setShowCategoryForm}
            />
          ) : null}
          <div>
            <SquareBtn
              name={"Add Product"}
              faicon={<HiOutlineViewGridAdd size={22} />}
              type={"button"}
              clickFunction={() => setShowCategoryForm(!CategoryForm)}
            />
          </div>
          <ProductDetailTable
            setId={setId}
            id={id}
            view={view}
            setView={setView}
            openupdate={openupdate}
            setOpenupdate={setOpenupdate}
            data={allusers}
            handleDeleteProduct={handleDeleteProduct}
            // handleUpadteProduct={handleUpadteProduct}
            allusers={allusers}
            setSelectedProduct={setSelectedProduct}
            OpenUpdateModel={OpenUpdateModel}
          />

          {openupdate ? (
            <UpdateProductForm
              setOpenupdate={setOpenupdate}
              openupdate={openupdate}
              selectedProduct={selectedProduct}
              setId={setId}
              id={id}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Products;
