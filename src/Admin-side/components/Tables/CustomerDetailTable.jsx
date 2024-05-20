import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
function CustomerDetailTable({ data, handleDeleteCustomer }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const columns = [
    { id: "id", label: "Id", minWidth: 50 },
    { id: "Name", label: "Name", minWidth: 50 },
    { id: "Email", label: "Email Id", minWidth: 50 },
    { id: "Mobile", label: "Mobile", minWidth: 50 },
  ];
  return (
    <>
      <div className="p-4 flex w-full justify-between">
        <h1 className="text-3xl text-[#056674] dark:text-[#F39422]">
          {"Tickets"}
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
              <TableRow className="">
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      fontFamily: "revert",
                      fontSize: "16px",
                      // fontWeight: "700",
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
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              textAlign: "justify",
                              // color: "#056674",
                              // font: "small-caption",
                            }}
                            className="!text-[#056674] dark:!bg-[#0f161b] dark:!text-[#F39422] text-2xl"
                          >
                            {value ? (
                              value
                            ) : (
                              <div className="w-full flex justify-between">
                                <FaRegEdit
                                  onClick={() => alert(row.id)}
                                  size={28}
                                  className=""
                                />
                                <MdDelete
                                  onClick={() => handleDeleteCustomer(row.id)}
                                  size={28}
                                  className="cursor-pointer"
                                />
                              </div>
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
    </>
  );
}

export default CustomerDetailTable;
