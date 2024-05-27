import React, { useState, useContext, useEffect } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { collection, onSnapshot } from "firebase/firestore";
import { CiTextAlignCenter } from "react-icons/ci";
import { IoDocumentText, IoVideocam } from "react-icons/io5";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { LoginContext, UserContext } from "../App";
import { auth, db } from "../FirebaseConfig";
import Navbar from "../helpers/Navbar";
import VerticalNavbar from "./components/VerticalNavbar";
import { Formikselect } from "../Support-sys/components/Formikselect";
import Button from "../Support-sys/components/Button";
import SquareBtn from "../Support-sys/components/SquareBtn";

function ImmediateUserSupport({ view, setView, setIsloading, isLoading }) {
  const { viewLogin, setViewLogin } = useContext(LoginContext);
  const { userName, setUserName } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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
          setProducts(filteredData);
          setCategories([...new Set(filteredData.map((e) => e.Category))]);
        }
      }
    );

    return () => unsubscribeProducts();
  }, [users]); // Add users as a dependency
  const [showAns, setShowAns] = useState(false);
  const [values, setValues] = useState([]);
  const [showText, setShowText] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [ToggleView, setToggleView] = useState(false);

  const handleClose = () => {
    setView(!view);
  };
  const handleCloseLogin = () => {
    setViewLogin(!viewLogin);
  };

  const handlegetHelp = () => {
    setShowAns(!showAns);
  };

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
  const filteredProductNames = (values) => {
    const categoryFilteredProducts = products.filter(
      (product) => product.Category === values.category
    );

    const filteredProductNames = categoryFilteredProducts.filter((product) =>
      users.some((user) =>
        user.ProductDetails.some(
          (detail) => detail.ProductName === product.ProductName
        )
      )
    );

    return filteredProductNames.map((product) => product.ProductName);
  };
  const filteredProductSerialNo = (values) => {
    const categoryFilteredProducts = products.filter(
      (product) => product.Category === values.category
    );

    const filteredSerialNumbers = categoryFilteredProducts.flatMap((product) =>
      product.ModelDetails.filter((issue) =>
        users.some((user) =>
          user.ProductDetails.some(
            (detail) => detail.Serial_No === issue.Assigned_Serial_No
          )
        )
      ).map((issue) => issue.Assigned_Serial_No)
    );

    return filteredSerialNumbers;
  };
  const filteredProductModelNo = (values) => {
    const categoryFilteredProducts = products.filter(
      (product) => product.Category === values.category
    );
    const productwiseFilteredProducts = categoryFilteredProducts.filter(
      (product) => product.ProductName === values.product
    );

    if (values.serialno) {
      const filteredModelNo = productwiseFilteredProducts.flatMap((product) =>
        product.ModelDetails.filter((model) =>
          users.some((user) =>
            user.ProductDetails.some(
              (detail) => detail.Model_No === model.Model_No
            )
          )
        ).map((e) => e.Model_No)
      );
      return filteredModelNo;
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar
        viewLogin={viewLogin}
        setViewLogin={setViewLogin}
        userName={userName}
        setUserName={setUserName}
      />
      <VerticalNavbar ToggleView={ToggleView} setToggleView={setToggleView} />

      <div className="flex w-full p-4 overflow-auto ">
        <div
          className={`bg-[#E0ECE4] dark:bg-[#040D12] w-full p-4 ${
            ToggleView ? `ml-24` : `ml-64`
          }`}
        >
          <div className="flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
            {!showAns ? (
              <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 sm:p-10 w-full max-w-4xl transition-transform transform hover:scale-105 duration-300">
                <h2 className="text-2xl sm:text-4xl font-semibold mb-6 text-center text-red-600">
                  Online - Support
                </h2>
                <Formik
                  initialValues={{
                    product: "",
                    category: "",
                    modelno: "",
                    serialno: "",
                    issue: "",
                  }}
                  validationSchema={Yup.object({
                    product: Yup.string().required("*required"),
                    issue: Yup.string().required("*required"),
                  })}
                  onSubmit={(values) => {
                    // setView(!view);
                    setValues(values);
                    handlegetHelp();
                  }}
                >
                  {({ values, setFieldValue }) => (
                    <Form className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Formikselect
                          label="Category"
                          name="category"
                          value={values.category}
                          data={categories}
                          onChange={(selectedCategory) => {
                            setFieldValue("category", selectedCategory);
                            setFieldValue("product", "");
                            setFieldValue("serialno", "");
                          }}
                        />
                        <Formikselect
                          label="Select Product"
                          name="product"
                          data={filteredProductNames(values)}
                          onChange={(selectedProduct) => {
                            setFieldValue("product", selectedProduct);
                            setFieldValue("issue", "");
                            setFieldValue("serialno", "");
                            setFieldValue("modelimage", "");
                          }}
                        />
                        <Formikselect
                          label="Serial No"
                          name="serialno"
                          data={filteredProductSerialNo(values)}
                          // value={values.serialno}
                          onChange={(selectedSerialNo) => {
                            setFieldValue("serialno", selectedSerialNo);
                            setFieldValue("issue", "");
                          }}
                        />
                        <Formikselect
                          label="Model No"
                          name="modelno"
                          placeholder="Enter Model No"
                          value={values.modelno}
                          data={filteredProductModelNo(values)}
                          onChange={(selectedModelNo) => {
                            setFieldValue("modelno", selectedModelNo);
                            setFieldValue("issue", "");
                          }}
                        />
                      </div>
                      <Formikselect
                        label="Select Your Issue"
                        name="issue"
                        data={products
                          .filter(
                            (product) => product.ProductName === values.product
                          )
                          .flatMap((product) =>
                            product.Allissues.filter(
                              (issue) =>
                                issue.Assigned_Model_No === values.modelno
                            )
                          )
                          .map((issue) => issue.issue)}
                        onChange={(selectedIssue) => {
                          setFieldValue("issue", selectedIssue);
                        }}
                      />
                      <div className="mt-6 flex justify-between">
                        <Button name="Get Help" type="submit" />
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            ) : (
              <div className=" w-11/12 flex items-center justify-end border-2 border-t-0 border-l-0 border-r-0 p-4 border-b-orange-500">
                <Button
                  name="Get Help Again"
                  type="button"
                  clickFunction={() => setShowAns(!showAns)}
                />
              </div>
            )}
          </div>
          {showAns && (
            <div className="flex flex-col items-center justify-start w-full h-screen">
              <h1 className="text-[#FF4B5C] font-semibold text-5xl w-full text-center mb-2">
                Your Solution
              </h1>
              <div className="flex justify-center w-full mb-5">
                <SquareBtn
                  name="Text"
                  faicon={<CiTextAlignCenter size={20} />}
                  clickFunction={() => {
                    setShowText(!showText);
                    setShowVideo(false);
                    setShowPdf(false);
                  }}
                />
                <SquareBtn
                  name="Video"
                  faicon={<IoVideocam size={20} />}
                  clickFunction={() => {
                    setShowText(false);
                    setShowVideo(!showVideo);
                    setShowPdf(false);
                  }}
                />
                <SquareBtn
                  name="Pdf"
                  faicon={<IoDocumentText size={20} />}
                  clickFunction={() => {
                    setShowText(false);
                    setShowVideo(false);
                    setShowPdf(!showPdf);
                  }}
                />
              </div>
              <div className="w-full flex flex-col items-center justify-center">
                {showText && (
                  <>
                    <h2 className="text-[#056674] text-2xl font-semibold mb-4">
                      Text Solution
                    </h2>
                    <div className="bg-[#E0ECE4] w-11/12 p-6 rounded-lg shadow-md">
                      {products.map((product) =>
                        product.Allissues.filter(
                          (item) =>
                            item.Assigned_Model_No === values.modelno &&
                            item.issue === values.issue
                        ).map((item, index) => (
                          <pre
                            key={index}
                            className="text-[#056674] text-lg whitespace-pre-wrap overflow-auto max-h-96"
                          >
                            {item.text ? item.text : "No Data Found"}
                          </pre>
                        ))
                      )}
                    </div>
                  </>
                )}
                {showVideo && (
                  <>
                    <h2 className="text-[#056674] text-2xl font-semibold mb-4">
                      Video Solution
                    </h2>
                    <div className="bg-[#E0ECE4] w-11/12 p-6 rounded-lg shadow-md ">
                      {products.map((product) =>
                        product.Allissues.filter(
                          (data) =>
                            data.Assigned_Model_No === values.modelno &&
                            data.issue === values.issue
                        ).map((issue, index) => {
                          const videoId =
                            issue.video.length !== 0
                              ? issue.video
                                  .split("/")
                                  .slice(-1)[0]
                                  .split("?")[0]
                              : null;

                          return videoId ? (
                            <iframe
                              key={index}
                              title={`Video ${index}`}
                              // width="100%"
                              // height="500px"
                              src={`https://www.youtube.com/embed/${videoId}`}
                              frameBorder="0"
                              allowFullScreen
                              className="w-full h-96 rounded-lg shadow-md"
                            />
                          ) : (
                            <p className="text-[#056674] text-xl font-semibold mb-4">
                              No Pdf Solution Available....
                            </p>
                          );
                        })
                      )}
                    </div>
                  </>
                )}
                {showPdf && (
                  <>
                    <h2 className="text-[#056674] text-2xl font-semibold mb-4">
                      PDF Solution
                    </h2>
                    <div className="bg-[#E0ECE4] w-11/12 p-6 rounded-lg shadow-md">
                      {products.map((product) =>
                        product.Allissues.filter(
                          (data) =>
                            data.Assigned_Model_No === values.modelno &&
                            data.issue === values.issue
                        ).map((issue, index) =>
                          issue.pdf.length !== 0 ? (
                            <iframe
                              key={index}
                              src={issue.pdf}
                              className="w-full h-96 rounded-lg shadow-md"
                              title={`PDF Viewer ${index}`}
                            />
                          ) : (
                            <p className="text-[#056674] text-xl font-semibold mb-4">
                              No Pdf Solution Available....
                            </p>
                          )
                        )
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImmediateUserSupport;
