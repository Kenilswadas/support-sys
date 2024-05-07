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

function ProductDetailTable({ data, handleDelete }) {
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
    { id: "Image", label: "Image", minWidth: 50 },
    { id: "id", label: "Id", minWidth: 50 },
    { id: "ProductName", label: "ProductName", minWidth: 50 },
    { id: "Category", label: "Category", minWidth: 50 },
    { id: "Model_No", label: "Model_No", minWidth: 50 },
    { id: "Serial_No", label: "Serial_No", minWidth: 50 },
    { id: "Action", label: "Action", minWidth: 50 },
  ];
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className="">
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
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
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
                          {column.id === "Image" ? (
                            <img
                              src={value}
                              alt="ProductImage"
                              className="w-20 h-20"
                            />
                          ) : value ? (
                            value
                          ) : (
                            <div className="w-full flex justify-between">
                              <FaRegEdit
                                onClick={() => alert(row.id)}
                                size={28}
                                className=""
                              />
                              <MdDelete
                                onClick={() => handleDelete(row.id)}
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
      />
    </Paper>
  );
}

export default ProductDetailTable;
