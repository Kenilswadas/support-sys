import * as React from "react";
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
  MdPreview,
} from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ViewCustomersAllProducts from "../../../User-side/components/Models/ViewCustomersAllProducts";

function CustomerDetailTable({
  data,
  handleDeleteCustomer,
  openupdate,
  setOpenupdate,
  handleUpdateCustomer,
  view,
  setView,
  id,
  setId,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const OpenUpdateModel = (id) => {
    setOpenupdate(!openupdate);
    handleUpdateCustomer(id);
  };

  const columns = [
    { id: "Name", label: "Name", minWidth: 100 },
    { id: "Email", label: "Email Id", minWidth: 150 },
    { id: "Mobile", label: "Mobile", minWidth: 100 },
    { id: "ProductDetails", label: "Product Details", minWidth: 300 },
    { id: "action", label: "Action", minWidth: 100 },
  ];

  return (
    <>
      <div className="p-4 flex w-full justify-between">
        <h1 className="text-3xl font-bold text-[#056674] dark:text-[#F39422]">
          Customers
        </h1>
      </div>
      <Paper
        sx={{ width: "100%", overflow: "hidden" }}
        className="dark:!bg-[#0f161b] dark:text-[#5C8374] text-[#003C4C]"
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
                    align={column.align}
                    style={{
                      backgroundColor: "#056674",
                      color: "white",
                      minWidth: column.minWidth,
                      fontFamily: "revert",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                    className="dark:!bg-[#0f161b] dark:!text-[#5C8374] !text-center"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className="!text-[#056674] dark:!bg-[#0f161b] dark:!text-[#5C8374]">
              {data.length === 0 ? (
                <TableRow>
                  <TableCell className="text-center ">
                    No data found.....
                  </TableCell>
                </TableRow>
              ) : (
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      className="transition duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ textAlign: "justify" }}
                            className="!text-[#056674] dark:!bg-[#0f161b] dark:!text-[#F39422] text-xl !text-center"
                          >
                            {column.id === "ProductDetails" ? (
                              value.length !== 0 ? (
                                <div className="">
                                  <Tooltip
                                    title="View All Products"
                                    placement="top"
                                  >
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
                              ) : (
                                "---"
                              )
                            ) : column.id !== "ProductDetails" &&
                              column.id !== "action" ? (
                              value
                            ) : column.id === "action" ? (
                              <div className="w-full flex justify-between">
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
                                    onClick={() => handleDeleteCustomer(row.id)}
                                  >
                                    <MdDelete />
                                  </IconButton>
                                </Tooltip>
                              </div>
                            ) : null}
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
          ActionsComponent={() => (
            <div className="flex items-center">
              <IconButton
                onClick={() => handleChangePage(null, page - 1)}
                disabled={page === 0}
                aria-label="previous page"
                sx={{ color: "#5C8374" }}
              >
                <MdKeyboardArrowLeft />
              </IconButton>
              <IconButton
                onClick={() => handleChangePage(null, page + 1)}
                disabled={page >= Math.ceil(data.length / rowsPerPage) - 1}
                aria-label="next page"
                sx={{ color: "#5C8374" }}
              >
                <MdKeyboardArrowRight />
              </IconButton>
            </div>
          )}
        />
      </Paper>
      {view ? (
        <ViewCustomersAllProducts
          data={data}
          setView={setView}
          view={view}
          id={id}
          setId={setId}
        />
      ) : null}
    </>
  );
}

export default CustomerDetailTable;
