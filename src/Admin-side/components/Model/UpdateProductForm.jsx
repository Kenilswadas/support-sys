import { FieldArray, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { FormikInput } from "../../../Support-sys/components/FormikInput";
import * as Yup from "yup";
import { RxCross1 } from "react-icons/rx";
import Button from "../../../Support-sys/components/Button.jsx";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../FirebaseConfig.jsx";
import { ToastContainer, toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import "react-toastify/dist/ReactToastify.css";
import { LoadderContext } from "../../../App.js";
import Loader from "../../../helpers/Loader.jsx";

function UpdateProductForm({
  setOpenupdate,
  openupdate,
  selectedProduct,
  setId,
  id,
}) {
  const { isLoading, setIsloading } = useContext(LoadderContext);
  const handleCloseLogin = () => {
    setOpenupdate(!openupdate);
    setId(null);
  };

  async function uploadFile(file) {
    if (!file) return null;
    const storageRef = ref(storage, `${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  return (
    <div className="bg-black flex flex-col overflow-auto items-center   w-full fixed inset-0  bg-cover bg-center bg-opacity-50 z-50 ">
      {/* <ToastContainer /> */}
      {isLoading === true ? <Loader /> : null}
      <div className="bg-white shadow-2xl p-4 sm:p-8 rounded flex flex-col items-center justify-center w-11/12 mx-autosrc/Support-sys/pages/Leandingpage.jsx src/Support-sys/pages/components ">
        <div className="flex items-end justify-end w-full ">
          <button
            className="bg-[#66BFBF] hover:bg-[#135D66] p-2 text-lg text-[#fbffff] rounded-full "
            onClick={handleCloseLogin}
          >
            <RxCross1 />
          </button>
        </div>
        <h2 className="text-lg sm:text-4xl font-semibold mb-2 sm:mb-4 text-[#FF0000]">
          {"Update Product"}
        </h2>
        <div className="w-full ">
          <Formik
            initialValues={{
              name: selectedProduct.ProductName || "",
              category: selectedProduct.Category || "",
              modeldetails: selectedProduct.ModelDetails || [],
              serialno: selectedProduct.Serial_No || [],
              allissues: selectedProduct.Allissues || [],
            }}
            validationSchema={Yup.object({
              name: Yup.string().required("*required"),
              category: Yup.string().required("*required"),
              // modelno: Yup.string().required("*required"),
              // serialno: Yup.string().required("*required"),
              allissues: Yup.array().of(
                Yup.object().shape({
                  video: Yup.string().url("Invalid URL format"),
                })
              ),
            })}
            onSubmit={async (values) => {
              console.log(values.allissues);
              setIsloading(true);
              try {
                // Upload image
                const imageUrl = await Promise.all(
                  values.modeldetails.map(async (model) => {
                    console.log(typeof model.Model_Image);
                    if (typeof model.Model_Image === "object") {
                      console.log(model.Model_Image);
                      return await uploadFile(model.Model_Image);
                    }
                  })
                );

                // Upload PDFs
                const pdfUrls = await Promise.all(
                  values.allissues.map(async (issue) => {
                    if (issue.pdf) {
                      return await uploadFile(issue.pdf);
                    }
                  })
                );
                console.log(imageUrl);
                console.log(pdfUrls);
                // Upload videos
                const videoUrls = values.allissues.map((issue) => issue.video);
                // Add document to Firestore
                await updateDoc(doc(db, "Products", id), {
                  ProductName: values.name,
                  Category: values.category,
                  Serial_No: values.serialno,
                  ModelDetails: values.modeldetails.map((model, index) => ({
                    Model_No: values.modeldetails[index].Model_No,
                    Model_Image:
                      typeof values.modeldetails[index].Model_Image !== "object"
                        ? values.modeldetails[index].Model_Image
                        : imageUrl[index] || [],
                  })),
                  Allissues: values.allissues.map((issue, index) => ({
                    ...issue,
                    pdf:
                      typeof values.allissues[index].pdf !== "object"
                        ? values.allissues[index].pdf
                        : pdfUrls[index] || [],
                    video: values.allissues[index].video,
                  })),
                });
                toast.success("Added Successfully");
                setIsloading(false);
                handleCloseLogin();
              } catch (error) {
                console.error(error.message);
                toast.error(error.message);
                setIsloading(false);
                handleCloseLogin();
              }
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="flex flex-col items-center justify-center  w-full">
                <div className="mt-0 sm:mt-0 w-full p-2 ">
                  <div className="grid grid-cols-2">
                    <div className="m-2">
                      <FormikInput
                        label={"Enter Product Name"}
                        name={"name"}
                        type={"text"}
                        value={values.name}
                        onChange={(event) => {
                          setFieldValue("name", event.currentTarget.value);
                        }}
                      />
                    </div>
                    <div className="m-2">
                      <FormikInput
                        label={"Enter Category"}
                        name={"category"}
                        type={"text"}
                        value={values.category}
                        onChange={(event) => {
                          setFieldValue("category", event.currentTarget.value);
                        }}
                      />
                    </div>
                    {/* <div className="m-2">
                      <FormikInput
                        label={"Enter Serial Number"}
                        name={"serialno"}
                        type={"number"}
                      />
                    </div> */}

                    {/* <div className="m-2">
                      <FormikInput
                        label={"Enter Model No."}
                        name={"modelno"}
                        type={"text"}
                      />
                    </div> */}
                    {/* <div className="m-2">
                      <label className="block  text-lg font-semibold text-[#056674] ">
                        {"Product Image"}
                      </label>
                      <input
                        type="file"
                        onChange={(event) => {
                          setFieldValue("image", event.currentTarget.files[0]);
                        }}
                      />
                    </div> */}
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="w-full">
                      <FieldArray name="serialno">
                        {({ push, remove }) => (
                          <div className="mt-2 sm:mt-4 p-2 border rounded bg-[#E0ECE4] m-2">
                            <label className="block text-lg font-semibold text-[#056674] mb-4 border-b-2 border-[#056674] ">
                              Enter Serial No.
                            </label>
                            <div className="grid grid-cols-1   overflow-auto max-h-32 ">
                              {values.serialno.map((e, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between"
                                >
                                  <FormikInput
                                    label={`Serial No ${index + 1}`}
                                    name={`serialno[${index}]`}
                                    type="text"
                                    value={values.serialno[index]}
                                    onChange={(event) => {
                                      setFieldValue(
                                        `serialno[${index}]`,
                                        event.currentTarget.value
                                      );
                                    }}
                                  />
                                  <button
                                    className="text-[#FF4B5C] hover:text-red-500 focus:outline-none"
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
                                    <MdDelete size={28} />
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div
                              className="mt-4 flex items-center justify-start cursor-pointer"
                              onClick={() => push("")}
                            >
                              <FaPlus size={28} className="text-[#056674]" />
                              <span className="ml-2 text-[#056674]">
                                Add Serial No
                              </span>
                            </div>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                    <div className="w-full">
                      <FieldArray name="modeldetails">
                        {({ push, remove }) => (
                          <div className="mt-2 sm:mt-4 p-2 border rounded bg-[#E0ECE4]">
                            <label className="block text-lg font-semibold text-[#056674] mb-4 border-b-2 border-[#056674] ">
                              Enter Model No.
                            </label>
                            <div className="grid grid-cols-1  overflow-auto max-h-32 ">
                              {values.modeldetails.map((e, index) => (
                                <div key={index} className="flex ">
                                  <FormikInput
                                    label={`Model No ${index + 1}`}
                                    name={`modeldetails[${index}].Model_No`}
                                    type="text"
                                    value={values.modeldetails[index].Model_No}
                                    onChange={(event) => {
                                      setFieldValue(
                                        `modeldetails[${index}].Model_No`,
                                        event.currentTarget.value
                                      );
                                    }}
                                  />
                                  <div className="m-2">
                                    <label className="block text-lg font-semibold text-[#056674] ">
                                      {"Product Image"}
                                    </label>
                                    <input
                                      type="file"
                                      name={`modeldetails[${index}].Model_Image`}
                                      onChange={(event) => {
                                        setFieldValue(
                                          `modeldetails[${index}].Model_Image`,
                                          event.currentTarget.files[0]
                                        );
                                      }}
                                    />
                                  </div>
                                  <button
                                    className="text-[#FF4B5C] hover:text-red-500 focus:outline-none"
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
                                    <MdDelete size={28} />
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div
                              className="mt-4 flex items-center justify-start cursor-pointer"
                              onClick={() =>
                                push({
                                  Model_No: "",
                                  Model_Image: "",
                                })
                              }
                            >
                              <FaPlus size={28} className="text-[#056674]" />
                              <span className="ml-2 text-[#056674]">
                                Add Model No
                              </span>
                            </div>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>
                  <div className="w-full pl-2">
                    <FieldArray name="allissues">
                      {({ push, remove }) => (
                        <div className="mt-2 sm:mt-4 p-2 border rounded bg-[#E0ECE4]">
                          <label className="block text-lg font-semibold text-[#056674] mb-4 border-b-2 border-[#056674] ">
                            Enter Related Isssue
                          </label>
                          <div className="grid grid-col-3 m-2 overflow-auto max-h-32 w-full border bg-[#E0ECE4]">
                            {values.allissues.map((e, index) => {
                              return (
                                <div className="flex items-center justify-center  m-2">
                                  <FormikInput
                                    label={`Issues No ${index + 1}`}
                                    name={`allissues[${index}].issue`}
                                    type={"text"}
                                    value={values.allissues[index].issue}
                                    onChange={(event) => {
                                      setFieldValue(
                                        `allissues[${index}].issue`,
                                        event.currentTarget.value
                                      );
                                    }}
                                  />
                                  <FormikInput
                                    label={`Text Solution ${index + 1}`}
                                    name={`allissues[${index}].text`}
                                    type={"textarea"}
                                    value={values.allissues[index].text}
                                    onChange={(event) => {
                                      setFieldValue(
                                        `allissues[${index}].text`,
                                        event.currentTarget.value
                                      );
                                    }}
                                  />
                                  <FormikInput
                                    label={`Video Solution ${index + 1}`}
                                    name={`allissues[${index}].video`}
                                    type={"text"}
                                    onChange={(event) => {
                                      setFieldValue(
                                        `allissues[${index}].video`,
                                        event.currentTarget.value
                                      );
                                    }}
                                    value={values.allissues[index].video}
                                  />
                                  <div className="w-full">
                                    <label className="block  text-lg font-semibold text-[#056674] ">
                                      {`Pdf Solution${index + 1}`}
                                    </label>
                                    <input
                                      className="block w-full px-4 py-2  text-gray-700 placeholder-gray-400 bg-white border border-[#77B0AA] rounded-md  focus:border-[#77B0AA]  focus:ring-[#66BFBF] focus:outline-none focus:ring focus:ring-opacity-40"
                                      type="file"
                                      name={`allissues[${index}].pdf`}
                                      onChange={(event) => {
                                        setFieldValue(
                                          `allissues[${index}].pdf`,
                                          event.currentTarget.files[0]
                                        );
                                      }}
                                      // multiple
                                    />
                                  </div>
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
                          <div
                            className="mt-4 flex items-center justify-start cursor-pointer"
                            onClick={() =>
                              push({
                                issue: "",
                                text: "",
                                video: [],
                                pdf: [],
                              })
                            }
                          >
                            <FaPlus size={28} className="text-[#056674]" />
                            <span className="ml-2 text-[#056674]">
                              Add Related Issue
                            </span>
                          </div>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                </div>
                <div className="m-2 w-full flex items-start">
                  <Button name={"Add Product"} type={"submit"} />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default UpdateProductForm;
