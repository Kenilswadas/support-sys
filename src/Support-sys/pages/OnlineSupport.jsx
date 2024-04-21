import React, { useState } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Form, Formik } from "formik";
import { FormikInput } from "../components/FormikInput.jsx";
import Button from "../components/Button.jsx";
import * as Yup from "yup";
import { Formikselect } from "../components/Formikselect.jsx";
import LoginModel from "../components/LoginModel.jsx";
import { useRef } from "react";
import SquareBtn from "../components/SquareBtn.jsx";
import { CiTextAlignCenter } from "react-icons/ci";
import { IoDocumentText } from "react-icons/io5";
import { IoVideocam } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
// import { Document, Page } from "react-pdf"; // Import pdfjs to use pdf.worker.js
// import pdf from "../components/s.pdf";
function OnlineSupport() {
  const [view, setView] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [values, setValues] = useState([]);
  const [showText, setShowText] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const contentRef = useRef(null);
  // const [numPages, setNumPages] = useState(0);
  // const [pageNumber, setPageNumber] = useState(1);
  const handleClose = () => {
    setView(!view);
  };
  const products = [
    { id: "p1", name: " Power Analyzer" },
    { id: "p2", name: "3 Phase Precision Power Analyzer" },
  ];
  const Category = [
    { id: "p1", name: "1 Phase Power Analyzer - VPAe" },
    { id: "p1", name: "3 Phase Precision Power Analyzer - VPA" },
    { id: "p2", name: "c-1" },
    { id: "p2", name: "c-2" },
  ];
  const modelnos = [{ name: "A" }, { name: "B" }, { name: "C" }];
  const issues = [
    { name: "issue-1", solution: "solution : 1" },
    { name: "issue-2", solution: "solution : 2" },
  ];
  const handlegetHelp = () => {
    setShowAns(!showAns);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className="bg-white flex flex-col overflow-auto items-center justify-center  w-full"
        ref={contentRef}
      >
        <div className="flex items-center justify-center mt-auto sm:mt-auto sm:mb-auto mb-auto w-full">
          {!showAns ? (
            <div className="bg-white p-4 sm:p-8 rounded shadow-md  w-2/4 mx-autosrc/Support-sys/pages/Leandingpage.jsx src/Support-sys/pages/components ">
              <h2 className="text-lg sm:text-4xl font-semibold mb-2 sm:mb-4 text-[#77B0AA]">
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
                    category: Yup.string().required("*required"),
                    modelno: Yup.string().required("*required"),
                    serialno: Yup.string().required("*required"),
                  })}
                  onSubmit={(values) => {
                    setView(!view);
                    setValues(values);
                    setShowText(true);
                    contentRef.current.scrollIntoView({ behavior: "smooth" });
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
                                (data) => `${data.id}` === `${values.product}`
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
                            <Formikselect
                              label={"Select Your Issue"}
                              name={"issue"}
                              data={issues}
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
            <div className="m-2 w-full flex items-start justify-center">
              <Button
                name={"Get Help Again"}
                type={"button"}
                clickFunction={() => setShowAns(!showAns)}
              />
            </div>
          )}
        </div>
        {view ? (
          <LoginModel
            handleClose={handleClose}
            handlegetHelp={handlegetHelp}
            title={"User Details"}
          />
        ) : null}
        {showAns ? (
          <div className="flex flex-col items-start justify-start w-full h-screen  bg-slate-100 mt-5">
            <h1 className="text-[#003C43]  font-semibold text-5xl w-full text-center">
              Your Solution
            </h1>
            <div className="flex flex-col items-center justify-center w-full">
              <div className="flex w-full items-center justify-around">
                <SquareBtn
                  name={"Text"}
                  faicon={<CiTextAlignCenter size={28} />}
                  clickFunction={() => {
                    setShowText(!showText);
                    setShowVideo(false);
                    setShowPdf(false);
                  }}
                />
                <SquareBtn
                  name={"Video"}
                  faicon={<IoVideocam size={28} />}
                  clickFunction={() => {
                    setShowText(false);
                    setShowVideo(!showVideo);
                    setShowPdf(false);
                  }}
                />
                <SquareBtn
                  name={"Pdf"}
                  faicon={<IoDocumentText size={28} />}
                  clickFunction={() => {
                    setShowText(false);
                    setShowVideo(false);
                    setShowPdf(!showPdf);
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center w-full">
              {showText ? (
                <>
                  <div className="bg-slate-200 w-3/4 flex flex-col items-start p-4 h-96 mt-5">
                    <div>
                      {issues
                        .filter((data) => data.name === values.issue)
                        .map((e) => {
                          return (
                            <p className="text-gray-700 text-4xl">
                              {e.name}
                              {" : "}
                            </p>
                          );
                        })}
                    </div>
                    <div className="mt-5">
                      {issues
                        .filter((data) => data.name === values.issue)
                        .map((e) => {
                          return (
                            <>
                              <p className="text-gray-700 text-4xl">
                                {e.solution}
                              </p>
                              <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Velit ducimus quas praesentium
                                ipsam, ullam nam soluta culpa, error blanditiis
                                saepe perspiciatis suscipit ea iure excepturi
                                ratione quidem! Libero, consectetur a.
                              </p>
                              <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Velit ducimus quas praesentium
                                ipsam, ullam nam soluta culpa, error blanditiis
                                saepe perspiciatis suscipit ea iure excepturi
                                ratione quidem! Libero, consectetur a.
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
                  <div className="bg-slate-200 w-3/4 flex flex-col items-start p-4 h-96 mt-5">
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
              {/* {showPdf && (
                <div className="bg-slate-200 w-3/4 flex flex-col items-start p-4 h-96 mt-5">
                  <div>
                    <Document file={pdf}>
                      <Page pageNumber={1} />
                    </Document>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default OnlineSupport;
