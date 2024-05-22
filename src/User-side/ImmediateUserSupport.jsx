import React, { useState, useContext, useEffect } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import { collection, onSnapshot } from "firebase/firestore";
import { CiTextAlignCenter } from "react-icons/ci";
import { IoDocumentText, IoVideocam } from "react-icons/io5";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { LoginContext, UserContext } from "../App";
import { db } from "../FirebaseConfig";
import Navbar from "../helpers/Navbar";
import VerticalNavbar from "./components/VerticalNavbar";
import { Formikselect } from "../Support-sys/components/Formikselect";
import Button from "../Support-sys/components/Button";
import SquareBtn from "../Support-sys/components/SquareBtn";

function ImmediateUserSupport({ view, setView, setIsloading, isLoading }) {
  const { viewLogin, setViewLogin } = useContext(LoginContext);
  const { userName, setUserName } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [categorys, setCategorys] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "Products"), (snap) => {
      const allProducts = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(allProducts);
      setCategorys([...new Set(allProducts.map((e) => e.Category))]);
    });
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar
        viewLogin={viewLogin}
        setViewLogin={setViewLogin}
        userName={userName}
        setUserName={setUserName}
      />
      <VerticalNavbar ToggleView={ToggleView} setToggleView={setToggleView} />

      <ToastContainer />
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
                      data={categorys}
                      onChange={(selectedCategory) => {
                        setFieldValue("category", selectedCategory);
                        setFieldValue("product", "");
                        setFieldValue("serialno", "");
                      }}
                    />
                    <Formikselect
                      label="Select Product"
                      name="product"
                      data={products
                        .filter((data) => data.Category === values.category)
                        .map((e) => e.ProductName)}
                      onChange={(selectedProduct) => {
                        setFieldValue("product", selectedProduct);
                        setFieldValue("issue", "");
                        setFieldValue("serialno", "");
                      }}
                    />
                    <Formikselect
                      label="Serial No"
                      name="serialno"
                      data={products
                        .filter((data) => data.ProductName === values.product)
                        .flatMap((product) => product.Serial_No)}
                      value={values.serialno}
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
                      data={products
                        .filter(
                          (product) => product.ProductName === values.product
                        )
                        .flatMap((product) =>
                          product.ModelDetails.filter(
                            (model) =>
                              model.Assigned_Serial_No === values.serialno
                          )
                        )
                        .map((model) => model.Model_No)}
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
                          (issue) => issue.Assigned_Model_No === values.modelno
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
      {/* {view && (
        <InfoModel
          handleClose={handleClose}
          handlegetHelp={handlegetHelp}
          title="User Details"
          info={values}
          setShowText={setShowText}
        />
      )}
      {viewLogin && (
        <LoginModel
          handleCloseLogin={handleCloseLogin}
          title="Login"
          setUserName={setUserName}
          isLoading={isLoading}
          setIsloading={setIsloading}
        />
      )} */}
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
                          ? issue.video.split("/").slice(-1)[0].split("?")[0]
                          : null;

                      return videoId ? (
                        <iframe
                          key={index}
                          title={`Video ${index}`}
                          width="100%"
                          height="500px"
                          src={`https://www.youtube.com/embed/${videoId}`}
                          frameBorder="0"
                          allowFullScreen
                          className="rounded-lg shadow-md"
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
  );
}

export default ImmediateUserSupport;
