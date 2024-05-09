import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { CiEdit } from "react-icons/ci";
import { Formikselect } from "../../../Support-sys/components/Formikselect";
import { Formik } from "formik";
import { MdFilterAlt } from "react-icons/md";

import * as Yup from "yup";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
function TicketsTable({
  Ticket,
  handleUpdateView,
  handleStatusChange,
  openupdate,
  setOpenupdate,
  selectedProduct,
  handleUpdate,
  id,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [viewFilter, setViewFilter] = useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "TicketId", label: "Ticket Id", minWidth: 50 },
    { id: "UserName", label: "Name", minWidth: 50 },
    { id: "UserEmail", label: "Email Id", minWidth: 50 },
    { id: "ProductName", label: "ProductName", minWidth: 50 },
    { id: "Category", label: "Category", minWidth: 50 },
    { id: "Model_No", label: "Model No", minWidth: 50 },
    { id: "Serial_No", label: "Serial No", minWidth: 50 },
    { id: "OtherIssue", label: "Issue", minWidth: 50 },
    { id: "Status", label: "Status", minWidth: 50 },
    { id: "Action", label: "Action", minWidth: 50 },
  ];
  const handleViewFilter = () => {
    if (viewFilter === false) {
      setViewFilter(true);
    } else {
      setViewFilter(false);
      handleStatusChange(null);
    }
  };
  const options = ["Active", "Pending", "Completed"];
  return (
    <div>
      <ToastContainer />
      <div className="p-4 flex w-full justify-between">
        <h1 className="text-3xl text-[#056674]">{"Tickets"}</h1>
        <div className="flex">
          {viewFilter ? (
            <Formik
              initialValues={{
                status: "",
              }}
              // validationSchema={Yup.object({
              //   status: Yup.string().required("*required"),
              // })}
              onSubmit={(values) => {
                alert(values);
              }}
            >
              {({ value, setFieldValue }) => (
                <div className="m-2">
                  <Formikselect
                    name={"status"}
                    data={options}
                    onChange={(selectedProduct) => {
                      setFieldValue("status", selectedProduct);
                      handleStatusChange(selectedProduct);
                    }}
                  />
                </div>
              )}
            </Formik>
          ) : null}
          <div
            className="flex items-center justify-center text-[#056674] cursor-pointer"
            onClick={() => handleViewFilter()}
          >
            <span>{"Filter By Status "}</span>
            <span>
              <MdFilterAlt size={28} />
            </span>
          </div>
        </div>
      </div>
      <Paper sx={{ width: "100%", overflow: "auto" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      fontFamily: "revert",
                      color: "#003C4C",
                      fontSize: "16px",
                      // fontWeight: "700",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Ticket.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            textAlign: "justify",
                            color: "#056674",
                            font: "small-caption",
                          }}
                        >
                          {column.id === "Status" ? (
                            <span className="flex items-center justify-center w-full">
                              {openupdate && row.id === id ? null : (
                                <span className="pr-2">{value}</span>
                              )}
                              {console.log(id)}
                              {console.log(column.id)}
                              {openupdate && row.id === id && (
                                <Formik
                                  initialValues={{
                                    approval: selectedProduct.Status,
                                  }}
                                  onSubmit={(values) => {
                                    setOpenupdate(false); // Close the update form
                                  }}
                                >
                                  {({ setFieldValue }) => (
                                    <div className="m-2">
                                      <Formikselect
                                        name={"approval"}
                                        data={options}
                                        onChange={(selected) => {
                                          setFieldValue("approval", selected);
                                          setOpenupdate(false);
                                          handleUpdate(id, selected);
                                        }}
                                      />
                                    </div>
                                  )}
                                </Formik>
                              )}
                            </span>
                          ) : column.id === "Action" ? (
                            value !== "Completed" && (
                              <CiEdit
                                size={20}
                                className="cursor-pointer"
                                onClick={() => handleUpdateView(row.id)}
                              />
                            )
                          ) : (
                            <span>{value}</span>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={Ticket.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default TicketsTable;
