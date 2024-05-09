import React, { useState, useContext, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import VericalNavbar from "./components/VericalNavbar.jsx";
import SquareBtn from "../Support-sys/components/SquareBtn.jsx";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import AddCategoryForm from "./components/Form/AddCategoryForm.jsx";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../FirebaseConfig.jsx";
import ProductDetailTable from "./components/Tables/ProductDetailTable.jsx";
import { toast } from "react-toastify";
import UpdateProductForm from "./components/Model/UpdateProductForm.jsx";
function Products() {
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
    deleteDoc(doc(db, "Products", id));
  };
  const handleUpadteProduct = (id) => {
    updateDoc(doc(db, "Products", id), {})
      .then((res) => {
        toast.success("Product is Updated");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const OpenUpdateModel = (id) => {
    const handleSelectedProduct = allusers.find((data) => data.id === id);
    setSelectedProduct(handleSelectedProduct);
    setOpenupdate(!openupdate);
    setId(id);
  };
  return (
    <div className="max-sm:w-full max-md:w-full">
      <Navbar />
      <VericalNavbar ToggleView={ToggleView} setToggleView={setToggleView} />
      <div className="flex w-full h-screen p-4 overflow-auto ">
        <div
          className={`bg-[#E0ECE4] w-full p-4 ${
            ToggleView ? `ml-24` : `ml-64 `
          }`}
        >
          <div>
            <h1>{""}</h1>
          </div>
          <SquareBtn
            name={"Add Product"}
            faicon={<HiOutlineViewGridAdd size={22} />}
            type={"button"}
            clickFunction={() => setShowCategoryForm(!CategoryForm)}
          />

          {CategoryForm ? (
            <AddCategoryForm
              CategoryForm={CategoryForm}
              setShowCategoryForm={setShowCategoryForm}
            />
          ) : null}
          <div className="flex p-4 overflow-auto ">
            <div
              className={`bg-[#E0ECE4] w-full flex items-center justify-center p-4 `}
            >
              <ProductDetailTable
                setId={setId}
                id={id}
                view={view}
                setView={setView}
                openupdate={openupdate}
                setOpenupdate={setOpenupdate}
                data={allusers}
                handleDeleteProduct={handleDeleteProduct}
                handleUpadteProduct={handleUpadteProduct}
                allusers={allusers}
                setSelectedProduct={setSelectedProduct}
                OpenUpdateModel={OpenUpdateModel}
              />
            </div>
          </div>
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
