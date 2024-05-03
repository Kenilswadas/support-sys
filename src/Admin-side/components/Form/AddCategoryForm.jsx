import { FieldArray, Form, Formik } from "formik";
import React from "react";
import { Formikselect } from "../../../Support-sys/components/Formikselect";
import { FormikInput } from "../../../Support-sys/components/FormikInput";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { RxCross1 } from "react-icons/rx";
import Button from "../../../Support-sys/components/Button.jsx";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

function AddCategoryForm({ CategoryForm, setShowCategoryForm }) {
  const handleCloseLogin = () => {
    setShowCategoryForm(!CategoryForm);
  };
  return (
    <div className="bg-black flex flex-col overflow-auto items-center justify-center  w-full fixed inset-0  bg-cover bg-center bg-opacity-50 z-50 ">
      <div className="bg-white shadow-2xl p-4 sm:p-8 rounded flex flex-col items-center justify-center w-4/6 mx-autosrc/Support-sys/pages/Leandingpage.jsx src/Support-sys/pages/components ">
        <div className="flex items-end justify-end w-full ">
          <button
            className="bg-[#66BFBF] hover:bg-[#135D66] p-2 text-lg text-[#fbffff] rounded-full "
            onClick={handleCloseLogin}
          >
            <RxCross1 />
          </button>
        </div>
        <h2 className="text-lg sm:text-4xl font-semibold mb-2 sm:mb-4 text-[#FF0000]">
          {"Add Product Category"}
        </h2>
        <div className="w-full ">
          <Formik
            initialValues={{
              category: "",
              subcategory: "",
              modelno: "",
              serialno: "",
              image: "",
              issue: [],
            }}
            validationSchema={Yup.object({
              category: Yup.string().required("*required"),
              subcategory: Yup.string().required("*required"),
              modelno: Yup.string().required("*required"),
              serialno: Yup.string().required("*required"),
            })}
            onSubmit={(values) => {
              const formData = {
                category: values.category,
                subcategory: values.subcategory,
                modelno: values.modelno,
                serialno: values.serialno,
                image: values.image,
                issue: values.issue.filter((issue) => issue.trim() !== ""), // Filter out empty issues
              };
              alert(JSON.stringify(formData, null, 2));
              localStorage.setItem(
                "SupportTicketData",
                JSON.stringify(formData)
              );
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="flex flex-col items-center justify-center w-full">
                <FieldArray name="issue">
                  {({ push, remove }) => (
                    <div className="mt-2 sm:mt-4 w-full p-2 ">
                      <div className="grid grid-cols-2">
                        <div className="m-2">
                          <FormikInput
                            label={"Enter Category Name"}
                            name={"category"}
                            type={"text"}
                          />
                        </div>
                        <div className="m-2">
                          <FormikInput
                            label={"Enter Sub Category"}
                            name={"subcategory"}
                            type={"text"}
                          />
                        </div>
                        <div className="m-2">
                          <FormikInput
                            label={"Enter Serial Number"}
                            name={"serialno"}
                            type={"number"}
                          />
                        </div>

                        <div className="m-2">
                          <FormikInput
                            label={"Enter Model No."}
                            name={"modelno"}
                            type={"text"}
                          />
                        </div>
                        <div className="m-2">
                          <FormikInput
                            label={"Upload Image"}
                            name={"image"}
                            type={"file"}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-start m-2">
                        <label className="block  text-lg font-semibold text-[#056674] ">
                          Enter Related Issues
                        </label>
                        <div
                          className="bg-[#E0ECE4] ml-2 p-2 rounded-full w-fit text-[#056674] cursor-pointer"
                          onClick={() => push("")}
                        >
                          <FaPlus size={28} />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 m-2 overflow-auto max-h-48 w-full border bg-[#E0ECE4]">
                        {values.issue.map((e, index) => {
                          return (
                            <div className="flex items-center justify-center  m-2">
                              <FormikInput
                                label={`Issues No ${index + 1}`}
                                name={`issue.${index}`}
                                type={"text"}
                              />
                              <button
                                className="flex mt-5"
                                type="button"
                                onClick={() => remove(index)}
                              >
                                <MdDelete
                                  size={28}
                                  className="text-[#FF4B5C]"
                                />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      <div className="m-2">
                        <Button name={"Add Product"} type={"submit"} />
                      </div>
                    </div>
                  )}
                </FieldArray>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default AddCategoryForm;
