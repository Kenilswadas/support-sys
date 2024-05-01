import React, { useState } from "react";
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
import { Category, issues, modelnos, products } from "../components/Data.jsx";

import url from "../components/EnglishGrammar_10000814.pdf";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
function OnlineSupport() {
  let location = useLocation();
  const [view, setView] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [values, setValues] = useState([]);
  const [showText, setShowText] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [alldata, setAlldata] = useState(null);
  const handleClose = () => {
    setView(!view);
  };

  const handlegetHelp = () => {
    setShowAns(!showAns);
  };
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  /*To Prevent right click on screen*/
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
  const page = useParams();
  console.log(page);
  return (
    <div className="max-sm:w-full max-md:w-full">
      <Navbar />
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
                    modelno: Yup.string().required("*required"),
                    serialno: Yup.string().required("*required"),
                  })}
                  onSubmit={(values) => {
                    // var formdata = new FormData();
                    // formdata.append("product", values.product);
                    var alldata = {
                      product: values.product,
                      category: values.category,
                      modelno: values.modelno,
                      serialno: values.serialno,
                      issue: values.issue,
                    };
                    const data = JSON.stringify(alldata);
                    localStorage.setItem("currentdata", data);
                    // console.log(formdata);
                    setAlldata(values);
                    setView(!view);
                    setValues(values);
                    setShowText(true);
                  }}
                >
                  {({ values }) => (
                    <Form className="flex flex-col items-center justify-center w-full">
                      <div className="mt-2 sm:mt-4 w-full p-2 ">
                        <div className="grid grid-cols-2">
                          <div className="m-2">
                            <Formikselect
                              label={"Select Product"}
                              name={"product"}
                              data={products}
                            />
                          </div>
                          <div className="m-2">
                            <Formikselect
                              label={"Select Category"}
                              name={"category"}
                              data={Category.filter(
                                (data) => `${data.P_id}` === `${values.product}`
                              )}
                            />
                          </div>
                          <div className="m-2">
                            <Formikselect
                              label={"Select Model No"}
                              name={"modelno"}
                              data={modelnos}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1">
                          <div className="m-2">
                            <FormikInput
                              label={"Enter Serial Number"}
                              name={"serialno"}
                              type={"number"}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1">
                          <div className="m-2">
                            {console.log(location.pathname)}
                            <Formikselect
                              label={"Select Your Issue"}
                              name={"issue"}
                              data={
                                location.pathname === "/Onlinesupport"
                                  ? issues.filter(
                                      (data) => data.name !== "other"
                                    )
                                  : issues
                              }
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
        <LoginModel
          handleClose={handleClose}
          handlegetHelp={handlegetHelp}
          title={"User Details"}
          alldata={alldata}
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
                <div className="bg-[#E0ECE4] w-11/12 flex flex-col items-start p-4 h-full mt-5">
                  <div>
                    {issues
                      .filter((data) => data.name === values.issue)
                      .map((e) => {
                        return (
                          <p className="text-[#056674] text-4xl">
                            {e.name}
                            {" : "}
                          </p>
                        );
                      })}
                  </div>
                  <div className="">
                    {issues
                      .filter((data) => data.name === values.issue)
                      .map((e) => {
                        return (
                          <>
                            <p className="text-[#056674] text-4xl">
                              {e.solution}
                            </p>
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Velit ducimus quas praesentium ipsam, ullam
                              nam soluta culpa, error blanditiis saepe
                              perspiciatis suscipit ea iure excepturi ratione
                              quidem! Libero, consectetur a.
                            </p>
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Velit ducimus quas praesentium ipsam, ullam
                              nam soluta culpa, error blanditiis saepe
                              perspiciatis suscipit ea iure excepturi ratione
                              quidem! Libero, consectetur a.
                            </p>
                          </>
                        );
                      })}
                  </div>
                </div>
              </>
            ) : null}
            {showVideo ? (
              <>
                <div className="bg-[#E0ECE4] w-11/12 flex flex-col items-start p-4 h-full mt-5">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/bzFT-3QJpWw?si=r4rcNUS74AF3Eggz"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </div>
              </>
            ) : null}
            {showPdf && (
              <>
                <div className=" bg-[#E0ECE4] w-11/12 flex flex-col items-start p-4 h-full mt-5">
                  <iframe src={url} className="h-full w-full" />
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
