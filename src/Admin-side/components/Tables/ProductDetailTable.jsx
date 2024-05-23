import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  MdDelete,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdPreview } from "react-icons/md";
import ViewSolution from "../Model/ViewSolution.jsx";
import { Formik } from "formik";
import { Formikselect } from "../../../Support-sys/components/Formikselect.jsx";
import { IconButton, Tooltip } from "@mui/material";

function ProductDetailTable({
  data,
  handleDeleteProduct,
  OpenUpdateModel,
  view,
  setView,
  setId,
  id,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedImages, setSelectedImages] = useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleModelChange = (rowId, modelNo, modelImage) => {
    setSelectedImages((prevImages) => ({
      ...prevImages,
      [rowId]: { modelNo, modelImage },
    }));
  };

  const columns = [
    { id: "srNo", label: "Sr no.", minWidth: 50 },
    { id: "ProductName", label: "Product Name" },
    { id: "Category", label: "Category" },
    { id: "ModelDetails", label: "Model No." },
    { id: "Image", label: "Image", minWidth: 150 },
    { id: "Serial_No", label: "Serial No." },
    { id: "Solution", label: "View Solution" },
    { id: "Action", label: "Action" },
  ];

  return (
    <div>
      <Paper
        sx={{ width: "100%", overflow: "auto" }}
        className="dark:!bg-[#0f161b] dark:text-[#5C8374] text-[#003C4C] overflow-auto mt-5"
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            className="dark:!bg-[#0f161b] dark:text-[#5C8374] overflow-auto"
          >
            <TableHead>
              <TableRow>
                {columns.map(({ id, label, minWidth }) => (
                  <TableCell
                    key={id}
                    style={{
                      backgroundColor: "#056674",
                      color: "white",
                      minWidth: minWidth,
                      fontFamily: "revert",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                    className="dark:!bg-[#0f161b] dark:!text-[#5C8374] !text-center"
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className="!text-[#056674] dark:!bg-[#0f161b] dark:!text-[#5C8374]">
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    No data found.....
                  </TableCell>
                </TableRow>
              ) : (
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow hover key={row.id} tabIndex={-1}>
                      {columns.map(({ id, label }) => {
                        const value = row[id];
                        const selectedImage =
                          selectedImages[row.id]?.modelImage;

                        return (
                          <TableCell
                            key={id}
                            align="left"
                            className="!text-[#056674] dark:!bg-[#0f161b] dark:!text-[#F39422] text-2xl"
                            style={{ textAlign: "center" }}
                          >
                            {id === "srNo" ? (
                              <span className="font-semibold text-xl">
                                {index + 1}
                              </span>
                            ) : id === "Image" ? (
                              selectedImage ? (
                                <img
                                  key={row.id}
                                  src={selectedImage}
                                  alt="ProductImage"
                                  className="w-20 h-20"
                                />
                              ) : (
                                <div>Please Select image</div>
                              )
                            ) : id === "ModelDetails" &&
                              label === "Model No." ? (
                              <Formik initialValues={{ Model_No: "" }}>
                                {({ setFieldValue }) => (
                                  <Formikselect
                                    name="Model_No"
                                    data={value?.map((e) => e.Model_No)}
                                    onChange={(selectedModel) => {
                                      const selectedModelImage = value?.find(
                                        (e) => e.Model_No === selectedModel
                                      )?.Model_Image;
                                      setFieldValue("Model_No", selectedModel);
                                      handleModelChange(
                                        row.id,
                                        selectedModel,
                                        selectedModelImage
                                      );
                                    }}
                                  />
                                )}
                              </Formik>
                            ) : id === "Serial_No" ? (
                              value?.map((e, i) => (
                                <p
                                  key={i}
                                  className="p-2 flex items-center justify-center"
                                >
                                  {e},
                                </p>
                              ))
                            ) : id === "Solution" &&
                              label === "View Solution" ? (
                              <Tooltip title="View Solution" placement="top">
                                <IconButton
                                  style={{ fontSize: "25px" }}
                                  className="!text-[#056674] dark:!bg-[#183D3D] !bg-[#E0ECE4] dark:!text-[#5C8374]"
                                  onClick={() => {
                                    setView(!view);
                                    setId(row.id);
                                  }}
                                >
                                  <MdPreview />
                                </IconButton>
                              </Tooltip>
                            ) : id === "Action" ? (
                              <div className="w-full flex justify-between m-2">
                                <Tooltip title="Edit" placement="top">
                                  <IconButton
                                    className="!text-[#056674] dark:!bg-[#183D3D] !bg-[#E0ECE4] dark:!text-[#5C8374]"
                                    style={{ fontSize: "25px" }}
                                    onClick={() => OpenUpdateModel(row.id)}
                                  >
                                    <FaRegEdit />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete" placement="top">
                                  <IconButton
                                    className="!text-[#056674] dark:!bg-[#183D3D] !bg-[#E0ECE4] dark:!text-[#5C8374]"
                                    style={{ fontSize: "25px" }}
                                    onClick={() => handleDeleteProduct(row.id)}
                                  >
                                    <MdDelete />
                                  </IconButton>
                                </Tooltip>
                              </div>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="dark:!bg-[#0f161b] text-[#003C4C] dark:text-[#5C8374]"
          nextIconButton={
            <IconButton
              onClick={() => handleChangePage(null, page + 1)}
              disabled={page >= Math.ceil(data.length / rowsPerPage) - 1}
              aria-label="next page"
              sx={{ color: "#5C8374" }}
            >
              <MdKeyboardArrowRight />
            </IconButton>
          }
          prevIconButton={
            <IconButton
              onClick={() => handleChangePage(null, page - 1)}
              disabled={page === 0}
              aria-label="previous page"
              sx={{ color: "#5C8374", margin: "5", backgroundColor: "white" }}
            >
              <MdKeyboardArrowLeft />
            </IconButton>
          }
        />
      </Paper>
      {view && (
        <ViewSolution data={data} setView={setView} view={view} id={id} />
      )}
    </div>
  );
}

export default ProductDetailTable;
