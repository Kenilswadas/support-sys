import React, { useState } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Form, Formik } from "formik";
import { FormikInput } from "../components/FormikInput.jsx";
import Button from "../components/Button.jsx";
import * as Yup from "yup";
import { Formikselect } from "../components/Formikselect.jsx";
import Navbar from "../components/Navbar.jsx";
import {
  Category,
  issues,
  modelnos,
  option,
  products,
} from "../components/Data.jsx";
import { NavLink } from "react-router-dom";

function SupportTicket({ SetTicket, Ticket }) {
  return (
    <div className="max-sm:w-full max-md:w-full">
      <Navbar />
      <div className="bg-white flex flex-col overflow-auto items-center justify-center  w-full">
        <div className="bg-white p-4 sm:p-8 rounded shadow-md flex flex-col items-center justify-center   w-2/4 mx-autosrc/Support-sys/pages/Leandingpage.jsx src/Support-sys/pages/components ">
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
                haveyougonethrough: "",
                getsolution: "",
                other: "",
              }}
              validationSchema={Yup.object({
                product: Yup.string().required("*required"),
                // category: Yup.string().required("*required"),
                modelno: Yup.string().required("*required"),
                serialno: Yup.string().required("*required"),
              })}
              onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
                SetTicket(values);
              }}
            >
              {({ values, setFieldValue }) => (
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
                        <Formikselect
                          label={"Select Your Issue"}
                          name={"issue"}
                          data={issues}
                        />
                      </div>
                    </div>
                    {values.issue && values.issue !== "other" && (
                      <div className="flex items-center justify-end w-full">
                        <div className="m-2 flex items-center justify-between w-full">
                          <p className=" text-[#77B0AA] text-xl font-medium mr-4">
                            Have you gone through the Online Support ? -{" "}
                          </p>
                          <Formikselect
                            name={"haveyougonethrough"}
                            data={option}
                          />
                        </div>
                      </div>
                    )}
                    {values.haveyougonethrough === "yes" && (
                      <div className="flex items-center justify-end w-full">
                        <div className="m-2 flex items-center justify-between w-full">
                          <p className=" text-[#77B0AA] text-xl font-medium mr-10">
                            Did you get the solution ? -{" "}
                          </p>
                          <Formikselect name={"getsolution"} data={option} />
                        </div>
                      </div>
                    )}
                    {(values.haveyougonethrough === "no" ||
                      (values.haveyougonethrough && values.issue) ===
                        "other") && (
                      <div className="flex items-center justify-end w-full">
                        <div className="m-2 flex items-center justify-between w-full">
                          <p className=" text-[#77B0AA] text-xl font-medium mr-10">
                            Please go to the Online Support -{" "}
                          </p>
                          <NavLink
                            to={"/OnlineSupport"}
                            className={
                              "text-xl text-green-900 underline underline-offset-2"
                            }
                          >
                            Online-Support
                          </NavLink>
                        </div>
                      </div>
                    )}
                    {(values.getsolution === "no" ||
                      values.issue === "other") && (
                      <div className="flex items-center justify-end w-full">
                        <div className="m-2 flex items-center justify-between w-full">
                          <FormikInput
                            name={"other"}
                            label={"Describe Your Issue --"}
                            placeholder={"other issue"}
                          />
                        </div>
                      </div>
                    )}
                    {(!(
                      values.haveyougonethrough === "yes" &&
                      values.getsolution === "yes"
                    ) ||
                      (values.haveyougonethrough == "no" &&
                        values.getsolution === "yes") ||
                      values.issue === "other") && (
                      <div className="m-2">
                        <Button name={"Get Help"} type={"submit"} />
                      </div>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportTicket;
