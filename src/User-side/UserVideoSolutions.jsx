import React, { useEffect, useState, useContext } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { FaFilterCircleXmark } from "react-icons/fa6";
import { Formik } from "formik";
import { MdFilterAlt } from "react-icons/md";
import { LoginContext, UserContext } from "../App";
import Navbar from "../helpers/Navbar";
import VideoCard from "../Support-sys/components/VideoCard";
import { Formikselect } from "../Support-sys/components/Formikselect";
import { auth, db } from "../FirebaseConfig";
import VerticalNavbar from "./components/VerticalNavbar";
import { ToastContainer, toast } from "react-toastify";

function UserVideoSolutions() {
  const { viewLogin, setViewLogin } = useContext(LoginContext);
  const { userName, setUserName } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [viewFilter, setViewFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [ToggleView, setToggleView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribeUsers = onSnapshot(
      collection(db, "UserDetails"),
      (snapshot) => {
        const allUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const currentUser = allUsers.filter(
          (data) => data.Email === auth?.currentUser?.email
        );
        setUsers(currentUser);
      }
    );

    return () => unsubscribeUsers();
  }, []);

  useEffect(() => {
    const unsubscribeProducts = onSnapshot(
      collection(db, "Products"),
      (snapshot) => {
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Assuming users state has been updated before this effect runs
        if (users.length > 0) {
          const userCategories = users.flatMap((user) =>
            user.ProductDetails.map((detail) => detail.Category)
          );
          const filteredData = allProducts.filter((product) =>
            userCategories.includes(product.Category)
          );
          console.log(filteredData);
          console.log(filteredData);
          setProducts(filteredData);
          setFilteredProducts(filteredData);
          setLoading(false);
        }
      }
    );

    return () => unsubscribeProducts();
  }, [users]); // Add users as a dependency

  const handleViewFilter = () => {
    setViewFilter(!viewFilter);
  };

  const handleClearFilter = () => {
    setViewFilter(false);
    setFilteredProducts(products);
  };

  const handleCategoryChange = (value) => {
    const filteredData = products.filter((data) => data.Category === value);
    setFilteredProducts(filteredData);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        viewLogin={viewLogin}
        setViewLogin={setViewLogin}
        userName={userName}
        setUserName={setUserName}
      />
      <VerticalNavbar ToggleView={ToggleView} setToggleView={setToggleView} />
      <div className="flex w-full p-4 overflow-auto">
        <div
          className={`bg-[#E0ECE4] dark:bg-[#040D12] w-full p-4 ${
            ToggleView ? `ml-24` : `ml-64`
          }`}
        >
          <div className="p-4 flex flex-col md:flex-row w-full justify-between items-center">
            <h1 className="text-3xl text-[#056674] dark:text-[#F39422]">
              Video Solutions
            </h1>
            <div className="flex items-center mt-4 md:mt-0">
              {viewFilter && (
                <Formik
                  initialValues={{ category: "" }}
                  onSubmit={(values) => {
                    handleCategoryChange(values.category);
                  }}
                >
                  {({ setFieldValue }) => (
                    <div className="m-2">
                      <Formikselect
                        name="category"
                        data={[...new Set(products.map((e) => e.Category))]}
                        onChange={(selectedCategory) => {
                          setFieldValue("category", selectedCategory);
                          handleCategoryChange(selectedCategory);
                        }}
                      />
                    </div>
                  )}
                </Formik>
              )}
              <div
                className="flex items-center justify-center text-[#056674] cursor-pointer mx-2"
                onClick={handleViewFilter}
              >
                <span>Filter By Category</span>
                <MdFilterAlt size={28} />
              </div>
              {viewFilter && (
                <div className="flex items-center justify-center text-[#056674] cursor-pointer mx-2">
                  <span>Clear Filters</span>
                  <FaFilterCircleXmark size={25} onClick={handleClearFilter} />
                </div>
              )}
            </div>
          </div>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <section className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const videoCards = product.Allissues.filter(
                  (issue) => issue.video
                ).map((issue, index) => {
                  const videoId =
                    issue.video !== ""
                      ? issue.video.split("/").slice(-1)[0].split("?")[0]
                      : null;
                  if (issue.video !== "") {
                    return (
                      <VideoCard
                        key={`${product.id}-${index}`}
                        src={videoId}
                        // description={issue.description || "Video description"}
                        category={product.Category}
                        productName={product.ProductName}
                      />
                    );
                  } else
                    <p className="text-[#056674] text-xl font-semibold mb-4">
                      No Video Solution Available....
                    </p>;
                });
                return videoCards;
              })}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserVideoSolutions;
