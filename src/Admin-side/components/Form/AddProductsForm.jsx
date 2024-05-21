import { FieldArray, Form, Formik } from "formik";
import React, { useContext } from "react";
import { FormikInput } from "../../../Support-sys/components/FormikInput.jsx";
import * as Yup from "yup";
import { RxCross1 } from "react-icons/rx";
import Button from "../../../Support-sys/components/Button.jsx";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../../FirebaseConfig.jsx";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import "react-toastify/dist/ReactToastify.css";
import { LoadderContext } from "../../../App.js";
import Loader from "../../../helpers/Loader.jsx";
import { Formikselect } from "../../../Support-sys/components/Formikselect.jsx";

function AddProductsForm({ CategoryForm, setShowCategoryForm }) {
  const { isLoading, setIsloading } = useContext(LoadderContext);
  const handleCloseLogin = () => {
    setShowCategoryForm(!CategoryForm);
  };

  async function uploadFile(file) {
    if (file.length === 0) return null;
    const storageRef = ref(storage, `${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }
  return (
    <div className="bg-black flex flex-col overflow-auto items-center   w-full fixed inset-0  bg-cover bg-center bg-opacity-50 z-50 ">
      {isLoading === true ? <Loader /> : null}
      <div className="bg-white !text-[#056674] dark:bg-[#0f161b] dark:!text-[#5C8374] shadow-2xl p-4 sm:p-8 rounded flex flex-col items-center justify-center w-11/12 mx-autosrc/Support-sys/pages/Leandingpage.jsx src/Support-sys/pages/components ">
        <div className="flex items-end justify-end w-full ">
          <button
            className="bg-[#66BFBF] hover:bg-[#135D66] p-2 text-lg text-[#fbffff] rounded-full "
            onClick={handleCloseLogin}
          >
            <RxCross1 />
          </button>
        </div>
        <h2 className="text-lg sm:text-4xl font-semibold mb-2 sm:mb-2 text-[#FF0000]">
          {"Add Products"}
        </h2>
        <div className="w-full">
          <Formik
            initialValues={{
              name: "",
              category: "",
              modeldetails: [],
              serialno: [],
              allissues: [],
              customers: [],
            }}
            validationSchema={Yup.object({
              name: Yup.string().required("*required"),
              category: Yup.string().required("*required"),
              allissues: Yup.array().of(
                Yup.object().shape({
                  video: Yup.string().url("Invalid URL format"),
                })
              ),
              customers: Yup.array().of(
                Yup.object().shape({
                  Buyer_Mobile_No: Yup.string()
                    .matches(/^[0-9]{10}$/, "Must be exactly 10 digits")
                    .required("*required"),
                  Assigned_Model_No: Yup.string().required("*required"),
                })
              ),
            })}
            onSubmit={async (values) => {
              setIsloading(true);
              try {
                // Upload images
                const imageUrl = await Promise.all(
                  values.modeldetails.map(async (model) => {
                    if (model.Model_Image) {
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
                // Add document to Firestore
                await addDoc(collection(db, "Products"), {
                  ProductName: values.name,
                  Category: values.category,
                  Serial_No: values.serialno,
                  ModelDetails: values.modeldetails.map((model, index) => ({
                    ...model,
                    Model_Image: imageUrl[index] || [],
                  })),
                  Allissues: values.allissues.map((issue, index) => ({
                    ...issue,
                    pdf: pdfUrls[index] || [],
                    video: values.allissues[index].video,
                  })),
                  Customers: values?.customers,
                })
                  .then((res) => {
                    toast.success("Added Successfully");
                    setIsloading(false);
                    handleCloseLogin();
                  })
                  .catch((err) => {
                    console.log(err);
                    toast.error(err.message);
                    setIsloading(false);
                    handleCloseLogin();
                  });
                // handleCloseLogin();
              } catch (error) {
                console.error(error);
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
                  <div className="flex w-full justify-around">
                    <div className="w-full m-2">
                      <FieldArray name="serialno">
                        {({ push, remove }) => (
                          <div className="mt-4 p-4 border rounded  bg-[#E0ECE4] overflow-auto max-h-80">
                            <label className="block text-lg font-semibold text-[#056674] mb-2 border-b-2 border-[#056674]">
                              Enter Serial No.
                            </label>
                            {values.serialno.map((e, index) => (
                              <div className="flex items-center mb-4">
                                <div key={index} className="mr-4">
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
                            <div className="flex items-center text-[#056674]">
                              <button
                                className="p-2 rounded-full bg-[#056674] bg-opacity-15 focus:ring-[#f95555] focus:outline-none focus:ring focus:ring-opacity-40 mr-2"
                                type="button"
                                onClick={() => push("")}
                              >
                                <FaPlus size={28} className="text-[#056674] " />
                              </button>
                              <span>Add Serial No</span>
                            </div>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                    <div className="w-full m-2">
                      <FieldArray name="modeldetails">
                        {({ push, remove }) => (
                          <div className="mt-4 p-4 border rounded bg-[#E0ECE4] overflow-auto max-h-80">
                            <label className="block text-lg font-semibold text-[#056674] mb-2 border-b-2 border-[#056674]">
                              Enter Model Deatils.
                            </label>
                            {values.modeldetails.map((model, index) => (
                              <div key={index} className=" border-b pb-4">
                                <div className=" flex items-center justify-center">
                                  <div className="mr-1 w-1/3">
                                    {/* <label className="block text-lg font-semibold text-[#056674] mb-2">
                                      Model No. {index + 1}
                                    </label> */}
                                    <FormikInput
                                      name={`modeldetails[${index}].Model_No`}
                                      type="text"
                                      label={"Model No."}
                                      placeholder={"Enter Model_No"}
                                      value={
                                        values.modeldetails[index].Model_No
                                      }
                                      onChange={(event) => {
                                        setFieldValue(
                                          `modeldetails[${index}].Model_No`,
                                          event.currentTarget.value
                                        );
                                      }}
                                    />
                                  </div>
                                  <div className="mr-1 w-1/3 ">
                                    {/* <label className="block text-lg font-semibold text-[#056674] mb-2">
                                      Assigned Serial_No.
                                    </label> */}
                                    <Formikselect
                                      name={`modeldetails[${index}].Assigned_Serial_No`}
                                      data={values.serialno}
                                      onChange={(event) => {
                                        setFieldValue(
                                          `modeldetails[${index}].Assigned_Serial_No`,
                                          event
                                        );
                                      }}
                                      label={"Assigned Serial_No."}
                                    />
                                  </div>
                                  <div className="w-1/3">
                                    <label className="block text-lg font-semibold text-[#056674] mb-4">
                                      Model Image
                                    </label>
                                    <div className="flex items-center">
                                      <input
                                        type="file"
                                        name={`modeldetails[${index}].Model_Image`}
                                        onChange={(event) => {
                                          event.preventDefault();
                                          const file =
                                            event.currentTarget.files[0];
                                          if (file) {
                                            setFieldValue(
                                              `modeldetails[${index}].Model_Image`,
                                              file
                                            );
                                          } else {
                                            console.error("No file selected");
                                          }
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <button
                                    className="ml-4 text-[#FF4B5C] hover:text-red-500 focus:outline-none"
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
                                    <MdDelete size={24} />
                                  </button>
                                </div>
                              </div>
                            ))}
                            <div className="flex items-center text-[#056674]">
                              <button
                                className="p-2 rounded-full bg-[#056674] bg-opacity-15 focus:ring-[#f95555] focus:outline-none focus:ring focus:ring-opacity-40 mr-2"
                                type="button"
                                onClick={() =>
                                  push({
                                    Model_No: "",
                                    Model_Image: "",
                                    Assigned_Serial_No: "",
                                  })
                                }
                              >
                                <FaPlus size={24} className="" />
                              </button>
                              <span>Add Model</span>
                            </div>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>
                  <div className="w-full pl-2">
                    <FieldArray name="allissues">
                      {({ push, remove }) => (
                        <div className="mt-2 sm:mt-4 p-2 border rounded bg-[#E0ECE4] overflow-auto max-h-[600px]">
                          <label className="block text-lg font-semibold text-[#056674] mb-2 border-b-2 border-[#056674] ">
                            Enter Related Isssue
                          </label>

                          {values.allissues.map((e, index) => {
                            return (
                              <div className="mb-4 border rounded p-4 bg-[#E0ECE4]">
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="col-span-2">
                                    <Formikselect
                                      label={`Assign Model_No`}
                                      name={`allissues[${index}].Assigned_Model_No`}
                                      type={"text"}
                                      data={values.modeldetails.map((e) => {
                                        return e.Model_No;
                                      })}
                                      onChange={(event) => {
                                        setFieldValue(
                                          `allissues[${index}].Assigned_Model_No`,
                                          event
                                        );
                                      }}
                                    />
                                  </div>
                                  <div className="col-span-2">
                                    <FormikInput
                                      label={`Issues No ${index + 1}`}
                                      name={`allissues[${index}].issue`}
                                      type={"text"}
                                      onChange={(event) => {
                                        setFieldValue(
                                          `allissues[${index}].issue`,
                                          event.currentTarget.value
                                        );
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <FormikInput
                                      label={`Video Solution ${index + 1}`}
                                      name={`allissues[${index}].video`}
                                      type={"text"}
                                      // value={values.allissues[index].video}
                                      onChange={(event) => {
                                        setFieldValue(
                                          `allissues[${index}].video`,
                                          event.currentTarget.value
                                        );
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="mt-4">
                                  <label className="block  text-lg font-semibold text-[#056674] ">{`Text Solution ${
                                    index + 1
                                  }`}</label>
                                  <textarea
                                    className="block w-full px-4 py-4 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-[#77B0AA] rounded-md  focus:border-[#77B0AA]  focus:ring-[#66BFBF] focus:outline-none focus:ring focus:ring-opacity-40"
                                    label={`Text Solution ${index + 1}`}
                                    name={`allissues[${index}].text`}
                                    type={"textarea"}
                                    rows={4}
                                    onChange={(event) => {
                                      setFieldValue(
                                        `allissues[${index}].text`,
                                        event.currentTarget.value
                                      );
                                    }}
                                    s
                                  />
                                </div>
                                <div className="mt-4">
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
                                  className="mt-4 text-red-600 flex items-center"
                                  type="button"
                                  onClick={() => remove(index)}
                                >
                                  <MdDelete size={28} className="mr-1" />
                                  Remove
                                </button>
                              </div>
                            );
                          })}
                          <div className="mt-4 flex items-center justify-start cursor-pointer p-2 ">
                            <button
                              type="button"
                              className="p-2 rounded-full bg-[#056674] bg-opacity-15 focus:ring-[#f95555] focus:outline-none focus:ring focus:ring-opacity-40"
                            >
                              <FaPlus
                                size={28}
                                className="text-[#056674] "
                                onClick={() =>
                                  push({
                                    Assigned_Model_No: "",
                                    issue: "",
                                    text: "",
                                    video: [],
                                    pdf: [],
                                  })
                                }
                              />
                            </button>
                            <span className="ml-2 text-[#056674]">
                              Add Related Issue
                            </span>
                          </div>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                  <div className="w-full pl-2">
                    <FieldArray name="customers">
                      {({ push, remove }) => (
                        <div className="mt-4 p-4 border rounded  bg-[#E0ECE4] overflow-auto max-h-80">
                          <label className="block text-lg font-semibold text-[#056674] mb-2 border-b-2 border-[#056674]">
                            Enter Customers (if any)
                          </label>
                          {values.customers.map((e, index) => (
                            <div className="flex items-center mb-4">
                              <div key={index} className="mr-4">
                                <FormikInput
                                  label={`Buyer ${index + 1}  Mobile No`}
                                  name={`customers[${index}].Buyer_Mobile_No`}
                                  type="number"
                                  value={values.buyers}
                                  onChange={(event) => {
                                    setFieldValue(
                                      `customers[${index}].Buyer_Mobile_No`,
                                      event.currentTarget.value
                                    );
                                  }}
                                />
                              </div>
                              <div className="col-span-2">
                                <Formikselect
                                  label={`Assign Model_No`}
                                  name={`customers[${index}].Assigned_Model_No`}
                                  type={"text"}
                                  data={values.modeldetails.map((e) => {
                                    return e.Model_No;
                                  })}
                                  onChange={(event) => {
                                    setFieldValue(
                                      `customers[${index}].Assigned_Model_No`,
                                      event
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
                          <div className="flex items-center text-[#056674]">
                            <button
                              className="p-2 rounded-full bg-[#056674] bg-opacity-15 focus:ring-[#f95555] focus:outline-none focus:ring focus:ring-opacity-40 mr-2"
                              type="button"
                              onClick={() =>
                                push({
                                  Assigned_Model_No: "",
                                  Buyer_Mobile_No: "",
                                })
                              }
                            >
                              <FaPlus size={28} className="text-[#056674] " />
                            </button>
                            <span>Add Buyer</span>
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

export default AddProductsForm;
