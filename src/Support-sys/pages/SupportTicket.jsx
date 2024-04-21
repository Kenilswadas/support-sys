import React, { useState } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Form, Formik } from "formik";
import { FormikInput } from "../components/FormikInput.jsx";
import Button from "../components/Button.jsx";
import * as Yup from "yup";
import { Formikselect } from "../components/Formikselect.jsx";

function SupportTicket() {
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
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="bg-white p-4 sm:p-8 rounded shadow-md  w-2/4 mx-autosrc/Support-sys/pages/Leandingpage.jsx src/Support-sys/pages/components ">
        <h2 className="text-lg sm:text-4xl font-semibold mb-2 sm:mb-4 text-[#77B0AA]">
          {"Support - Ticket"}
        </h2>
        <div className="w-full ">
          <Formik
            initialValues={{
              product: "",
              category: "",
              modelno: "",
              serialno: "",
              issue: "",
              other: "",
            }}
            validationSchema={Yup.object({
              product: Yup.string().required("*required"),
              category: Yup.string().required("*required"),
              modelno: Yup.string().required("*required"),
              serialno: Yup.string().required("*required"),
            })}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2));
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
    </div>
  );
}

export default SupportTicket;
