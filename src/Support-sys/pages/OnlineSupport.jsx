import React, { useState, useContext, useEffect } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../FirebaseConfig.jsx";
import Navbar from "../components/Navbar.jsx";
import Button from "../components/Button.jsx";
import { Formikselect } from "../components/Formikselect.jsx";
import InfoModel from "../components/InfoModel.jsx";
import LoginModel from "../components/LoginModel.jsx";
import SquareBtn from "../components/SquareBtn.jsx";
import { CiTextAlignCenter } from "react-icons/ci";
import { IoDocumentText, IoVideocam } from "react-icons/io5";
import { UserContext } from "../../App.js";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

function OnlineSupport({
  view,
  setView,
  viewLogin,
  setViewLogin,
  userName,
  setIsloading,
  isLoading,
}) {
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

  const setUserName = useContext(UserContext);

  return (
    <div className="max-sm:w-full max-md:w-full">
      <Navbar
        viewLogin={viewLogin}
        setViewLogin={setViewLogin}
        userName={userName}
        setUserName={setUserName}
      />
      <ToastContainer />
      <div className="bg-white flex flex-col overflow-auto items-center justify-center w-full">
        <div className="flex items-center justify-center mt-auto sm:mt-auto sm:mb-auto mb-auto w-full">
          {!showAns ? (
            <div className="bg-white border mt-5 shadow-2xl p-4 sm:p-8 rounded w-2/4 mx-auto">
              <h2 className="text-lg sm:text-4xl font-semibold mb-2 sm:mb-4 text-[#FF4B5C]">
                Online - Support
              </h2>
              <div className="w-full">
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
                    setView(!view);
                    setValues(values);
                  }}
                >
                  {({ values, setFieldValue }) => (
                    <Form className="flex flex-col items-center justify-center w-full">
                      <div className="mt-2 sm:mt-4 w-full p-2">
                        <div className="grid grid-cols-2">
                          <div className="m-2">
                            <Formikselect
                              label={"Category"}
                              name={"category"}
                              value={values.category}
                              data={categorys}
                              onChange={(selectedCategory) => {
                                setFieldValue("category", selectedCategory);
                                setFieldValue("product", "");
                                setFieldValue("serialno", "");
                              }}
                            />
                          </div>
                          <div className="m-2">
                            <Formikselect
                              label={"Select Product"}
                              name={"product"}
                              data={products
                                .filter(
                                  (data) => data.Category === values.category
                                )
                                .map((e) => e.ProductName)}
                              onChange={(selectedProduct) => {
                                setFieldValue("product", selectedProduct);
                                setFieldValue("issue", "");
                                setFieldValue("serialno", "");
                              }}
                            />
                          </div>
                          <div className="m-2">
                            <Formikselect
                              label={"Serial No"}
                              name={"serialno"}
                              data={products
                                .filter(
                                  (data) => data.ProductName === values.product
                                )
                                .flatMap((product) => product.Serial_No)}
                              value={values.serialno}
                              onChange={(selectedSerialNo) => {
                                setFieldValue("serialno", selectedSerialNo);
                                setFieldValue("issue", "");
                              }}
                            />
                          </div>
                          <div className="m-2">
                            <Formikselect
                              label={"Model No"}
                              name={"modelno"}
                              placeholder={"Enter Model No"}
                              value={values.modelno}
                              data={
                                products
                                  .filter(
                                    (product) =>
                                      product.ProductName === values.product
                                  ) // Filter products by ProductName
                                  .flatMap((product) =>
                                    product.ModelDetails.filter(
                                      (model) =>
                                        model.Assigned_Serial_No ===
                                        values.serialno // Check if serialno matches Assigned_Serial_No
                                    )
                                  )
                                  .map((model) => model.Model_No) // Extract Model_No
                              }
                              onChange={(selectedModelNo) => {
                                setFieldValue("modelno", selectedModelNo);
                                setFieldValue("issue", "");
                              }}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1">
                          <div className="m-2">
                            <Formikselect
                              label={"Select Your Issue"}
                              name={"issue"}
                              data={
                                products
                                  .filter(
                                    (product) =>
                                      product.ProductName === values.product
                                  ) // Filter products by ProductName
                                  .flatMap((product) =>
                                    product.Allissues.filter(
                                      (issue) =>
                                        issue.Assigned_Model_No ===
                                        values.modelno // Check if modelno matches Assigned_Model_No
                                    )
                                  )
                                  .map((issue) => issue.issue) // Extract issue
                              }
                              onChange={(selectedIssue) => {
                                setFieldValue("issue", selectedIssue);
                              }}
                            />
                          </div>
                        </div>
                        <div className="m-2">
                          <Button name={"Get Help"} type={"submit"} />
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          ) : (
            <div className="m-2 w-11/12 flex items-center justify-end border-2 border-t-0 border-l-0 border-r-0 p-4 border-b-orange-500">
              <Button
                name={"Get Help Again"}
                type={"button"}
                clickFunction={() => setShowAns(!showAns)}
              />
            </div>
          )}
        </div>
      </div>
      {view ? (
        <InfoModel
          handleClose={handleClose}
          handlegetHelp={handlegetHelp}
          title={"User Details"}
          info={values}
          setShowText={setShowText}
        />
      ) : null}
      {viewLogin ? (
        <LoginModel
          handleCloseLogin={handleCloseLogin}
          title={"Login"}
          setUserName={setUserName}
          isLoading={isLoading}
          setIsloading={setIsloading}
        />
      ) : null}
      {showAns && (
        <div className="flex flex-col items-start justify-start w-full h-screen mt-5">
          <h1 className="text-[#FF4B5C] font-semibold text-5xl w-full text-center">
            Your Solution
          </h1>
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex w-11/12 justify-end">
              <SquareBtn
                name={"Text"}
                faicon={<CiTextAlignCenter size={20} />}
                clickFunction={() => {
                  setShowText(!showText);
                  setShowVideo(false);
                  setShowPdf(false);
                }}
              />
              <SquareBtn
                name={"Video"}
                faicon={<IoVideocam size={20} />}
                clickFunction={() => {
                  setShowText(false);
                  setShowVideo(!showVideo);
                  setShowPdf(false);
                }}
              />
              <SquareBtn
                name={"Pdf"}
                faicon={<IoDocumentText size={20} />}
                clickFunction={() => {
                  setShowText(false);
                  setShowVideo(false);
                  setShowPdf(!showPdf);
                }}
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-full h-full">
            {showText && (
              <>
                <h2 className="text-[#056674] text-xl font-semibold mb-2">
                  Text
                </h2>
                <div className="bg-[#E0ECE4] w-11/12 flex items-start p-4 h-full mt-5">
                  <div>
                    {products.map((product) => (
                      <pre
                        key={product.id}
                        className="text-[#056674] text-xl whitespace-pre-wrap overflow-auto max-h-96"
                      >
                        {product.Allissues.filter(
                          (item) =>
                            item.Assigned_Model_No === values.modelno &&
                            item.issue === values.issue
                        )
                          .map((item) => item.text)
                          .join("\n")}
                      </pre>
                    ))}
                  </div>
                </div>
              </>
            )}
            {showVideo && (
              <>
                <h2 className="text-[#056674] text-xl font-semibold mb-2">
                  Videos
                </h2>
                <div className="bg-[#E0ECE4] w-11/12 flex items-start justify-center p-4 h-full mt-5">
                  {products.map((product) =>
                    product.Allissues.filter(
                      (data) =>
                        data.Assigned_Model_No === values.modelno &&
                        data.issue === values.issue
                    ).map((issue, index) => {
                      const videoId = issue.video
                        .split("/")
                        .slice(-1)[0]
                        .split("?")[0];
                      return (
                        <div key={index} className="w-full h-full m-2">
                          <iframe
                            title={`Video ${index}`}
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            frameBorder="0"
                            allowFullScreen
                          />
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            )}
            {showPdf && (
              <>
                <h2 className="text-[#056674] text-xl font-semibold mb-2">
                  PDFs
                </h2>
                <div className="bg-[#E0ECE4] w-11/12 flex flex-col items-start h-screen p-4 mt-5">
                  {products.map((product) =>
                    product.Allissues.filter(
                      (data) =>
                        data.Assigned_Model_No === values.modelno &&
                        data.issue === values.issue
                    ).map((issue, index) => {
                      const pdfId = issue.pdf;
                      return (
                        <div key={index} className="w-full h-full m-2">
                          <iframe
                            src={pdfId}
                            className="h-full w-full"
                            title="PDF Viewer"
                          />
                        </div>
                      );
                    })
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

export default OnlineSupport;
