import React, { useState, useEffect, useContext } from "react";
import { FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { auth, db } from "../../../FirebaseConfig";
import Button from "../../../Support-sys/components/Button.jsx";
import { Formikselect } from "../../../Support-sys/components/Formikselect.jsx";
import { RxCross1 } from "react-icons/rx";
import { FormikInput } from "../../../Support-sys/components/FormikInput.jsx";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { LoadderContext } from "../../../App.js";
import Loader from "../../../helpers/Loader.jsx";

function UpdateUserForm({ setOpenupdate, openupdate, selectedUser }) {
  const [products, setProducts] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const { isLoading, setIsloading } = useContext(LoadderContext);

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

  const handleClose = () => {
    setOpenupdate(!openupdate);
  };

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
  const getModelImage = (productName, serialNo, modelNo) => {
    const model = products
      .filter((product) => product.ProductName === productName)
      .flatMap((product) =>
        product.ModelDetails.filter(
          (model) =>
            model.Assigned_Serial_No === serialNo && model.Model_No === modelNo
        )
      )[0]; // Assuming there is only one match

    return model ? model.Model_Image : "";
  };
  return (
    <div className="bg-black flex flex-col overflow-auto items-center w-full fixed inset-0 bg-opacity-50 z-50">
      <ToastContainer />
      {isLoading && <Loader />}
      <div className="flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8 w-full max-w-4xl">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 sm:p-10 w-full transition-transform transform hover:scale-105 duration-300">
          <div className="flex items-end justify-end">
            <button
              className="bg-[#66BFBF] hover:bg-[#135D66] p-2 text-lg text-[#fbffff] rounded-full"
              onClick={handleClose}
            >
              <RxCross1 />
            </button>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold mb-6 text-center text-red-600">
            Update User Details
          </h2>
          <Formik
            initialValues={{
              productdetails: selectedUser.ProductDetails || [],
              name: selectedUser.Name || "",
              email: selectedUser.Email || "",
              mobile: selectedUser.Mobile || "",
            }}
            validationSchema={Yup.object({
              name: Yup.string().required("*required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("*required"),
              mobile: Yup.string()
                .matches(/^[0-9]{10}$/, "Must be exactly 10 digits")
                .required("*required"),
            })}
            onSubmit={(values) => {
              //loader start
              setIsloading(true);
              updateDoc(doc(db, "UserDetails", selectedUser.id), {
                Name: values.name,
                Mobile: values.mobile,
                Email: values.email,
                ProductDetails: values.productdetails,
                Uid: selectedUser.Uid,
              })
                .then((res) => {
                  toast.success("User Added Successfully");
                  setIsloading(false);
                  handleClose();
                })
                .catch((err) => {
                  console.log(err);
                  setIsloading(false);
                  handleClose();
                });
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <FormikInput
                      name="name"
                      placeholder="Name"
                      type="text"
                      label="Enter Your Name"
                      value={values.name}
                      onChange={(event) => {
                        setFieldValue("name", event.currentTarget.value);
                      }}
                    />
                    <FormikInput
                      name="email"
                      placeholder="Email"
                      type="email"
                      label="Enter Your Email"
                      value={values.email}
                      onChange={(event) => {
                        setFieldValue("email", event.currentTarget.value);
                      }}
                    />
                    <FormikInput
                      name="mobile"
                      placeholder="Mobile No."
                      type="text"
                      label="Enter Mobile No."
                      value={values.mobile}
                      onChange={(event) => {
                        setFieldValue("mobile", event.currentTarget.value);
                      }}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <FieldArray name="productdetails">
                    {({ push, remove }) => (
                      <div className="mt-4 p-4 border rounded bg-[#E0ECE4] overflow-auto max-h-80">
                        <label className="block text-lg font-semibold text-[#056674] mb-0 border-b-2 border-[#056674]">
                          Assign Product Details
                        </label>
                        {values.productdetails.map((model, index) => (
                          <div key={index} className="border-b pb-4 mb-0">
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-2">
                              <Formikselect
                                type="text"
                                label="Category"
                                name={`productdetails[${index}].Category`}
                                value={values.productdetails[index].Category}
                                data={categorys}
                                onChange={(selectedCategory) => {
                                  setFieldValue(
                                    `productdetails[${index}].Category`,
                                    selectedCategory
                                  );
                                  setFieldValue(
                                    `productdetails[${index}].ProductName`,
                                    ""
                                  );
                                  setFieldValue(
                                    `productdetails[${index}].Serial_No`,
                                    ""
                                  );
                                }}
                              />
                              <Formikselect
                                type="text"
                                label="Product Name"
                                name={`productdetails[${index}].ProductName`}
                                value={values.productdetails[index].ProductName}
                                data={products
                                  .filter(
                                    (data) =>
                                      data.Category ===
                                      values.productdetails[index].Category
                                  )
                                  .map((e) => e.ProductName)}
                                onChange={(selectedProduct) => {
                                  setFieldValue(
                                    `productdetails[${index}].ProductName`,
                                    selectedProduct
                                  );
                                  setFieldValue(
                                    `productdetails[${index}].Serial_No`,
                                    ""
                                  );
                                }}
                              />
                              <Formikselect
                                type="text"
                                label="Serial No"
                                name={`productdetails[${index}].Serial_No`}
                                value={values.productdetails[index].Serial_No}
                                data={products
                                  .filter(
                                    (data) =>
                                      data.ProductName ===
                                      values.productdetails[index].ProductName
                                  )
                                  .flatMap((product) => product.Serial_No)}
                                onChange={(selectedSerialNo) => {
                                  setFieldValue(
                                    `productdetails[${index}].Serial_No`,
                                    selectedSerialNo
                                  );
                                }}
                              />
                              <Formikselect
                                label="Model No"
                                name={`productdetails[${index}].Model_No`}
                                value={values.productdetails[index].Model_No}
                                data={products
                                  .filter(
                                    (product) =>
                                      product.ProductName ===
                                      values.productdetails[index].ProductName
                                  )
                                  .flatMap((product) =>
                                    product.ModelDetails.filter(
                                      (model) =>
                                        model.Assigned_Serial_No ===
                                        values.productdetails[index].Serial_No
                                    )
                                  )
                                  .map((model) => model.Model_No)}
                                onChange={(selectedModelNo) => {
                                  setFieldValue(
                                    `productdetails[${index}].Model_No`,
                                    selectedModelNo
                                  );
                                  const productName =
                                    values.productdetails[index].ProductName;
                                  const serialNo =
                                    values.productdetails[index].Serial_No;
                                  const imageUrl = getModelImage(
                                    productName,
                                    serialNo,
                                    selectedModelNo
                                  );
                                  setFieldValue(
                                    `productdetails[${index}].Model_Image`,
                                    imageUrl
                                  );
                                }}
                              />
                              <FormikInput
                                hidden={"hidden"}
                                name={`productdetails[${index}].Model_Image`}
                                type={"text"}
                                readOnly={true}
                                value={values.productdetails[index].Model_Image}
                              />
                              {values.productdetails[index].Model_Image ? (
                                <img
                                  src={values.productdetails[index].Model_Image}
                                  alt="Model_Image"
                                />
                              ) : null}
                              <button
                                className="mt-0 text-red-600 flex items-center"
                                type="button"
                                onClick={() => remove(index)}
                              >
                                <MdDelete size={28} className="mr-1" />
                                Remove
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
                                Category: "",
                                ProductName: "",
                                Serial_No: "",
                                Model_No: "",
                              })
                            }
                          >
                            <FaPlus size={24} />
                          </button>
                          <span>Add Model</span>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </div>
                <div className="mt-6 flex justify-center">
                  <Button name="Update" type="submit" />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default UpdateUserForm;