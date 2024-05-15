import React, { useState, useContext, useEffect } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Form, Formik } from "formik";
import { FormikInput } from "../components/FormikInput.jsx";
import Button from "../components/Button.jsx";
import * as Yup from "yup";
import { Formikselect } from "../components/Formikselect.jsx";
import LoginModel from "../components/LoginModel.jsx";
import SquareBtn from "../components/SquareBtn.jsx";
import { CiTextAlignCenter } from "react-icons/ci";
import { IoDocumentText } from "react-icons/io5";
import { IoVideocam } from "react-icons/io5";
import Navbar from "../components/Navbar.jsx";
import { pdfjs } from "react-pdf";
import InfoModel from "../components/InfoModel.jsx";
import { UserContext } from "../../App.js";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../FirebaseConfig.jsx";
import { ToastContainer } from "react-toastify";

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
      console.log(allProducts);
      setProducts(allProducts);
      setCategorys(allProducts.map((e) => e.Category));
      console.log(categorys);
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

  /*To Prevent right click on screen*/
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
  const setUserName = useContext(UserContext);
  console.log(viewLogin);
  return (
    <div className="max-sm:w-full max-md:w-full">
      <Navbar
        viewLogin={viewLogin}
        setViewLogin={setViewLogin}
        userName={userName}
        setUserName={setUserName}
      />
      <ToastContainer />
      <div className="bg-white flex flex-col overflow-auto items-center justify-center  w-full">
        <div className="flex items-center justify-center mt-auto sm:mt-auto sm:mb-auto mb-auto w-full">
          {!showAns ? (
            <div className="bg-white  border mt-5 shadow-2xl p-4 sm:p-8 rounded  w-2/4 mx-autosrc/Support-sys/pages/Leandingpage.jsx src/Support-sys/pages/components ">
              <h2 className="text-lg sm:text-4xl font-semibold mb-2 sm:mb-4 text-[#FF4B5C]">
                {"Online - Support"}
              </h2>
              <div className="w-full ">
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
                    // modelno: Yup.string().required("*required"),
                    // serialno: Yup.string().required("*required"),
                  })}
                  onSubmit={(values) => {
                    // var formdata = new FormData();
                    // formdata.append("product", values.product);
                    // var alldata = {
                    //   product: values.product,
                    //   category: values.category,
                    //   modelno: values.modelno,
                    //   serialno: values.serialno,
                    //   issue: values.issue,
                    // };
                    // const data = JSON.stringify(alldata, 2, null);
                    // alert(data);
                    // localStorage.setItem("currentdata", data);
                    setView(!view);
                    setValues(values);
                    // setShowText(true);
                  }}
                >
                  {({ values, setFieldValue }) => (
                    <Form className="flex flex-col items-center justify-center w-full">
                      <div className="mt-2 sm:mt-4 w-full p-2 ">
                        <div className="grid grid-cols-2">
                          <div className="m-2">
                            <Formikselect
                              label={"Category"}
                              name={"category"}
                              value={values.category}
                              data={products.map((e) => e.Category)}
                              onChange={(selectedProduct) => {
                                setFieldValue("category", selectedProduct);
                                const selectedProductData = products.find(
                                  (data) => data.ProductName === selectedProduct
                                );
                                setFieldValue(
                                  "product",
                                  selectedProductData ? selectedProductData : ""
                                );
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
                                .map((e, index) => {
                                  return e.Serial_No.map((E) => {
                                    return E;
                                  });
                                })
                                .flat()}
                              value={values.serialno}
                              onChange={(selectedProduct) => {
                                setFieldValue("serialno", selectedProduct);
                              }}
                            />
                          </div>
                          <div className="m-2">
                            <Formikselect
                              label={"Model No"}
                              name={"modelno"}
                              placeholder={"Enter Model No"}
                              value={values.modelno}
                              data={products
                                .filter(
                                  (data) => data.ProductName === values.product
                                )
                                .map(
                                  (e, index) => e.ModelDetails[index].Model_No
                                )
                                .flat()}
                              onChange={(selectedProduct) => {
                                setFieldValue("modelno", selectedProduct);
                              }}
                            />
                          </div>
                          {/* <div className="m-2">
                            <Formikselect
                              label={"Select Model No"}
                              name={"modelno"}
                              data={modelnos}
                            />
                          </div> */}
                        </div>
                        {/* <div className="grid grid-cols-1">
                          <div className="m-2">
                            <FormikInput
                              label={"Enter Serial Number"}
                              name={"serialno"}
                              type={"number"}
                            />
                          </div>
                        </div> */}
                        <div className="grid grid-cols-1">
                          <div className="m-2">
                            <Formikselect
                              label={"Select Your Issue"}
                              name={"issue"}
                              data={products
                                .filter(
                                  (data) => data.ProductName === values.product
                                )
                                .map((e) => e.Allissues)
                                .flat()}
                              onChange={(selectedProduct) => {
                                setFieldValue("issue", selectedProduct);
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
            <div className="m-2 w-11/12 flex items-center justify-end border-2 border-t-0 border-l-0 border-r-0 p-4 border-b-orange-500 ">
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
      {showAns ? (
        <div className="flex flex-col items-start justify-start w-full h-screen  mt-5">
          <h1 className="text-[#FF4B5C]  font-semibold text-5xl w-full text-center">
            Your Solution
          </h1>
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex w-11/12 justify-end ">
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
            {showText ? (
              <>
                {" "}
                <h2 className="text-[#056674] text-xl font-semibold mb-2">
                  Text
                </h2>
                <div className="bg-[#E0ECE4] w-11/12 flex items-start p-4 h-full mt-5">
                  <div>
                    {products
                      .filter(
                        (data, index) =>
                          data.ModelDetails[index].Model_No === values.modelno
                      )
                      .map((e) => {
                        return (
                          <pre className="text-[#056674] text-xl whitespace-pre-wrap overflow-auto max-h-96">
                            {e.Allissues.filter(
                              (data) => data.issue === values.issue
                            ).map((e) => e.text)}
                          </pre>
                        );
                      })}
                  </div>
                </div>
              </>
            ) : null}
            {showVideo ? (
              <>
                <h2 className="text-[#056674] text-xl font-semibold mb-2">
                  Videos
                </h2>
                <div className="bg-[#E0ECE4] w-11/12 flex items-start justify-center p-4 h-full mt-5">
                  {products
                    .filter((data) => data.ProductName === values.product)
                    .map((product) =>
                      product.Allissues.filter(
                        (data) => data.issue === values.issue
                      ).map((issue, index) => {
                        const videoId = issue.video
                          .split("/")
                          .slice(-1)[0]
                          .split("?")[0];
                        return (
                          <div key={index} className="w-full  h-full m-2">
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
            ) : null}
            {showPdf && (
              <>
                <h2 className="text-[#056674] text-xl font-semibold mb-2">
                  PDFs
                </h2>
                <div className=" bg-[#E0ECE4] w-11/12 flex flex-col items-start h-screen p-4 mt-5">
                  {products
                    .filter((data) => data.ProductName === values.product)
                    .map((product) =>
                      product.Allissues.filter(
                        (data) => data.issue === values.issue
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
      ) : null}
    </div>
  );
}

export default OnlineSupport;
