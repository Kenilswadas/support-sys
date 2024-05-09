import { FieldArray, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
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
    <div className="bg-black flex flex-col overflow-auto items-center justify-center  w-full fixed inset-0  bg-cover bg-center bg-opacity-50 z-50 ">
      <ToastContainer />
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
          {"Add Product Category"}
        </h2>
        <div className="w-full ">
          {console.log(selectedProduct)}
          <Formik
            initialValues={{
              name: selectedProduct.ProductName,
              category: selectedProduct.Category,
              modelno: selectedProduct.Model_No,
              serialno: selectedProduct.Serial_No,
              image: selectedProduct.Image,
              allissues: selectedProduct.Allissues,
            }}
            validationSchema={Yup.object({
              name: Yup.string().required("*required"),
              category: Yup.string().required("*required"),
              modelno: Yup.string().required("*required"),
              serialno: Yup.string().required("*required"),
              allissues: Yup.array().of(
                Yup.object().shape({
                  video: Yup.string().url("Invalid URL format"),
                })
              ),
            })}
            onSubmit={async (values) => {
              setIsloading(true);
              try {
                // Upload image
                const imageUrl = await uploadFile(values.image);
                // Upload PDFs
                const pdfUrls = await Promise.all(
                  values.allissues.map(async (issue) => {
                    if (issue.pdf) {
                      return await uploadFile(issue.pdf);
                    }
                  })
                );
                console.log(pdfUrls);
                // Upload videos
                const videoUrls = values.allissues.map((issue) => issue.video);
                // Add document to Firestore
                await updateDoc(doc(db, "Products", id), {
                  ProductName: values.name,
                  Category: values.category,
                  Serial_No: values.serialno,
                  Model_No: values.modelno,
                  Allissues: values.allissues.map((issue, index) => ({
                    ...issue,
                    pdf:
                      selectedProduct?.Allissues[index]?.pdf ===
                      values.allissues[index].pdf
                        ? values.allissues[index].pdf
                        : pdfUrls[index] || [], // Replace File object with URL
                    video:
                      selectedProduct?.Allissues[index]?.video ===
                      values.allissues[index].video
                        ? values.allissues[index].video
                        : videoUrls[index] || [], // Add videos array
                  })),
                  Image:
                    selectedProduct.Image === values.image
                      ? values.Image
                      : imageUrl,
                });
                toast.success("Added Successfully");
                setIsloading(false);
                handleCloseLogin();
              } catch (error) {
                console.error(error);
                toast.error(error.message);
                setIsloading(false);
                handleCloseLogin();
              }
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="flex flex-col items-center justify-center w-full">
                <FieldArray name="allissues">
                  {({ push, remove }) => (
                    <div className="mt-2 sm:mt-4 w-full p-2 ">
                      <div className="grid grid-cols-2">
                        <div className="m-2">
                          <FormikInput
                            label={"Enter Product Name"}
                            name={"name"}
                            type={"text"}
                            value={values.name}
                          />
                        </div>
                        <div className="m-2">
                          <FormikInput
                            label={"Enter Category"}
                            name={"category"}
                            type={"text"}
                            value={values.category}
                          />
                        </div>
                        <div className="m-2">
                          <FormikInput
                            label={"Enter Serial Number"}
                            name={"serialno"}
                            type={"number"}
                            value={values.serialno}
                          />
                        </div>

                        <div className="m-2">
                          <FormikInput
                            label={"Enter Model No."}
                            name={"modelno"}
                            type={"text"}
                            value={values.modelno}
                          />
                        </div>
                        <div className="m-2">
                          <label className="block  text-lg font-semibold text-[#056674] ">
                            {"Product Image"}
                          </label>
                          {/* <label htmlFor="">Privious Image</label> */}
                          {/* {console.log(values.image)}
                          <img
                            src={values.image}
                            alt=""
                            className="w-20 h-20"
                          /> */}
                          <input
                            type="file"
                            onChange={(event) => {
                              setFieldValue(
                                "image",
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-start m-2">
                        <label className="block  text-lg font-semibold text-[#056674] ">
                          Enter Related Issues
                        </label>
                        <div
                          className="bg-[#E0ECE4] ml-2 p-2 rounded-full w-fit text-[#056674] cursor-pointer"
                          onClick={() =>
                            push({
                              issue: "",
                              text: "",
                              video: [],
                              pdf: [],
                            })
                          }
                        >
                          <FaPlus size={28} />
                        </div>
                      </div>
                      <div className="grid grid-col-3 m-2 overflow-auto max-h-40 w-full border bg-[#E0ECE4]">
                        {values.allissues.map((e, index) => {
                          return (
                            <div className="flex items-center justify-center m-2">
                              <FormikInput
                                label={`Issues No ${index + 1}`}
                                name={`allissues[${index}].issue`}
                                type={"text"}
                                value={values.allissues[index].issue}
                              />
                              <FormikInput
                                label={`Text Solution ${index + 1}`}
                                name={`allissues[${index}].text`}
                                type={"textarea"}
                                value={values.allissues[index].text}
                              />
                              <FormikInput
                                label={`Video Solution ${index + 1}`}
                                name={`allissues[${index}].video`}
                                type={"text"}
                                onChange={(event) => {
                                  setFieldValue(
                                    `allissues[${index}].video`,
                                    event.currentTarget.values
                                  );
                                }}
                                value={values.allissues[index].video}
                              />
                              <div className="w-full">
                                <label className="block  text-lg font-semibold text-[#056674] ">
                                  {`Pdf Solution${index + 1}`}
                                </label>
                                {/* <iframe
                                  src={values.allissues[index].pdf}
                                  className="h-20 w-20"
                                  title="PDF Viewer"
                                /> */}
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

export default UpdateProductForm;
