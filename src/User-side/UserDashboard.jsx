import React, { useContext, useEffect, useState } from "react";
import VerticalNavbar from "./components/VerticalNavbar";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../helpers/Navbar";
import { LoadderContext, LoginContext, UserContext } from "../App";
import Loader from "../helpers/Loader";
import RaiseIssue from "./components/Models/RaiseIssue";

function UserDashboard() {
  const { viewLogin, setViewLogin } = useContext(LoginContext);
  const { userName, setUserName } = useContext(UserContext);
  const { isLoading, setIsloading } = useContext(LoadderContext);

  const [ToggleView, setToggleView] = useState(false);
  const [RaiseIssueModel, setOpenRaiseIssueModel] = useState(false);
  const [allproducts, setAllproducts] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [selectedProduct, setselectedProduct] = useState(null);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true); // State to control skeleton loading
  const navigate = useNavigate();
  // const adminpages = ["/adminDashboard", "/Ticket", "/Products", "/Customers"];
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email === "admin@gmail.com") {
          navigate("/Customers");
        } else navigate("/UserDashboard");
      } else navigate("/");
    });
  }, [navigate]);

  useEffect(() => {
    onSnapshot(collection(db, "Products"), (snap) => {
      const alldata = snap.docs.map((e) => ({
        id: e.id,
        ...e.data(),
      }));
      setAllproducts(alldata);
    });
    onSnapshot(collection(db, "UserDetails"), (snap) => {
      const alldata = snap.docs.map((e) => ({
        id: e.id,
        ...e.data(),
      }));
      const filterdata = alldata.filter(
        (some) => some.Uid === auth?.currentUser?.uid
      );
      setCurrentUser(filterdata);
      // Turn off skeleton loading after 2 seconds
      setTimeout(() => {
        setLoadingSkeleton(false);
      }, 2000);
    });
  }, []);

  const handleRaiseIssue = (product) => {
    alert(JSON.stringify(product, null, 2));
    const userProductNames = product.ProductName;
    console.log(userProductNames);
    const filterdata = allproducts.filter(
      (data) => data.ProductName === userProductNames
    );
    console.log(filterdata);
    setselectedProduct(filterdata);
    setOpenRaiseIssueModel(!RaiseIssueModel);
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
      {isLoading && <Loader />}
      <div className="flex w-full h-full p-4 overflow-auto ">
        <div
          className={`bg-[#E0ECE4] dark:bg-[#040D12] w-full p-4 ${
            ToggleView ? `ml-24` : `ml-64`
          }`}
        >
          <h1 className="text-3xl text-[#056674] dark:text-[#F39422] mb-4">
            Products
          </h1>
          {/* Skeleton loading */}
          {loadingSkeleton && (
            <div className="grid grid-cols-3 gap-4">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white  dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ring-4 ring-red-500 ring-opacity-40 dark:ring-0 animate-pulse"
                >
                  <div className="h-48 bg-[#E0ECE4]" />
                  <div className="p-5">
                    <div className="h-4 w-3/4 bg-gray-300 mb-2" />
                    <div className="h-4 w-1/2 bg-gray-300 mb-2" />
                    <div className="h-4 w-2/3 bg-gray-300 mb-2" />
                    <div className="h-4 w-3/4 bg-gray-300 mb-2" />
                    <div className="flex items-center justify-between">
                      <div className="h-8 w-24 bg-blue-300 dark:bg-blue-400 text-white font-bold py-2 px-4 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Actual content */}
          {!loadingSkeleton && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6  ">
              {currentUser.length !== 0 ? (
                currentUser.map((user) =>
                  user.ProductDetails.map((product, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ring-4 ring-red-500 ring-opacity-40 dark:ring-0"
                    >
                      <img
                        className="w-full h-48 object-cover p-10"
                        src={
                          product.Model_Image ||
                          "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                        }
                        alt="ProductImage"
                      />
                      <div className="p-5">
                        <h3 className="text-lg font-semibold mb-2 dark:text-white">
                          {product.ProductName}
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Model No: {product.Model_No}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Category: {product.Category}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm my-4">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Duis vitae ante vel eros fermentum faucibus sit
                          amet euismod lorem.
                        </p>
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => handleRaiseIssue(product)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                          >
                            raise Issue
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : (
                <p className="text-[#056674] text-xl font-semibold mb-4">
                  {"You have No Purchased Products..."}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      {RaiseIssueModel ? (
        <RaiseIssue
          setOpenRaiseIssueModel={setOpenRaiseIssueModel}
          RaiseIssueModel={RaiseIssueModel}
          selectedProduct={selectedProduct}
        />
      ) : null}
    </div>
  );
}

export default UserDashboard;
