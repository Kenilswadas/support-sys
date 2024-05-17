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
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [Model_No, setModel_No] = useState(null);
  const columns = [
    { id: "Srno", label: "Sr no.", minWidth: 50 },
    { id: "id", label: "Id", maxWidth: 50 },
    { id: "ProductName", label: "ProductName" },
    { id: "Category", label: "Category" },
    { id: "ModelDetails", label: "Model_No" },
    { id: "ModelDetails", label: "Image", minWidth: 150 },
    { id: "Serial_No", label: "Serial_No" },
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
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    style={{
                      minWidth: column.minWidth,
                      fontFamily: "revert",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                    className="!text-[#056674] dark:!bg-[#0f161b] dark:!text-[#5C8374]"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className="!text-[#056674] dark:!bg-[#0f161b] dark:!text-[#5C8374]">
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover key={row.id} tabIndex={-1}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align="left"
                          style={{
                            // font: "small-caption",
                            // fontSize: "14px",
                            textAlign: "center",
                          }}
                          className="!text-[#056674] dark:!bg-[#0f161b] dark:!text-[#F39422] text-2xl"
                        >
                          {column.id === "Srno" ? (
                            <span className="font-semibold text-xl ">
                              {index + 1}
                            </span>
                          ) : column.id === "ModelDetails" &&
                            column.label === "Image" ? (
                            <div key={row.id}>
                              {value
                                .filter((data) => data.Model_No === Model_No)
                                .map((e) => {
                                  return (
                                    <img
                                      key={e.Model_No}
                                      src={e.Model_Image}
                                      alt="ProductImage"
                                      className="w-20 h-20 "
                                    />
                                  );
                                })}
                            </div>
                          ) : column.id === "ModelDetails" &&
                            column.label === "Model_No" ? (
                            <div className="">
                              {/* {value.map((e) => (
                                <p className="p-2 border-2 border-[#E0ECE4] h-20 w-20 flex items-center justify-center">
                                  {e.Model_No}
                                  {","}
                                </p>
                              ))} */}
                              <Formik
                                initialValues={{
                                  Model_No: "",
                                }}
                                // validationSchema={Yup.object({
                                //   status: Yup.string().required("*required"),
                                // })}
                                // onSubmit={(values) => {
                                //   alert(values);
                                // }}
                              >
                                {({ values, setFieldValue }) => (
                                  <div className="">
                                    <Formikselect
                                      key={row.id}
                                      name={"Model_No"}
                                      data={value.map((e) => e.Model_No)}
                                      onChange={(selectedProduct) => {
                                        setFieldValue(
                                          "Model_No",
                                          selectedProduct
                                        );
                                        setModel_No(selectedProduct);
                                      }}
                                    />
                                  </div>
                                )}
                              </Formik>
                            </div>
                          ) : column.id === "Serial_No" ? (
                            <>
                              {value.map((e) => {
                                return (
                                  <p className="p-2 flex items-center justify-center ">
                                    {e}
                                    {","}
                                  </p>
                                );
                              })}
                            </>
                          ) : column.id === "Solution" &&
                            column.label === "View Solution" ? (
                            <div className="w-full flex justify-between ">
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
                            </div>
                          ) : value ? (
                            <p>{value}</p>
                          ) : (
                            <div className="w-full flex justify-between m-2  ">
                              <Tooltip title="Edit" placement="top">
                                <IconButton
                                  className="!text-[#056674] dark:!bg-[#183D3D] !bg-[#E0ECE4] dark:!text-[#5C8374] "
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
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
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
              onClick={() => handleChangePage(page + 1)}
              disabled={page >= Math.ceil(data.length / rowsPerPage) - 1}
              aria-label="next page"
              sx={{ color: "#5C8374" }} // Change the color as per your requirement
            >
              <MdKeyboardArrowRight />
            </IconButton>
          }
          prevIconButton={
            <IconButton
              onClick={() => handleChangePage(page - 1)}
              disabled={page === 0}
              aria-label="previous page"
              sx={{ color: "#5C8374", margin: "5", backgroundColor: "white" }} // Change the color as per your requirement
            >
              <MdKeyboardArrowLeft />
            </IconButton>
          }
        />
      </Paper>
      {view ? (
        <ViewSolution data={data} setView={setView} view={view} id={id} />
      ) : null}
    </div>
  );
}

export default ProductDetailTable;
