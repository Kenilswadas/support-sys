import React, { useEffect, useState } from "react";
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
import { MdPreview } from "react-icons/md";
import ViewSolution from "../Model/ViewSolution.jsx";
function ProductDetailTable({
  data,
  handleDeleteProduct,
  handleUpadteProduct,
  openupdate,
  setOpenupdate,
  OpenUpdateModel,
  view,
  setView,
  setId,
  id,
  allusers,
  setSelectedProduct,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "Srno", label: "Sr no." },
    { id: "Image", label: "Image", minWidth: 150 },
    { id: "id", label: "Id", maxWidth: 50 },
    { id: "ProductName", label: "ProductName" },
    { id: "Category", label: "Category" },
    { id: "Model_No", label: "Model_No" },
    { id: "Serial_No", label: "Serial_No" },
    { id: "Solution", label: "View Solution" },
    { id: "Action", label: "Action" },
  ];

  return (
    <div>
      <Paper sx={{}}>
        <TableContainer sx={{ maxHeight: 440, maxWidth: 1100 }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            className="overflow-auto"
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
                      color: "#003C4C",
                      fontSize: "16px",
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
                .map((row, index) => (
                  <TableRow hover key={row.id} tabIndex={-1}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align="left"
                          style={{
                            color: "#056674",
                            font: "small-caption",
                            fontSize: "10px",
                          }}
                        >
                          {column.id === "Srno" ? (
                            <span className="font-semibold text-xl">
                              {index + 1}
                            </span>
                          ) : column.id === "Image" ? (
                            <img
                              src={value}
                              alt="ProductImage"
                              className="w-20 h-20"
                            />
                          ) : column.id === "Solution" &&
                            column.label === "View Solution" ? (
                            <div className="w-full flex justify-between ">
                              <MdPreview
                                size={28}
                                onClick={() => {
                                  setView(!view);
                                  setId(row.id);
                                }}
                              />
                            </div>
                          ) : value ? (
                            <p>{value}</p>
                          ) : (
                            <div className="w-full flex justify-between ">
                              <FaRegEdit
                                onClick={() => OpenUpdateModel(row.id)}
                                size={28}
                                className=""
                              />
                              <MdDelete
                                onClick={() => handleDeleteProduct(row.id)}
                                size={28}
                                className="cursor-pointer"
                              />
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
        />
      </Paper>
      {view ? (
        <ViewSolution data={data} setView={setView} view={view} id={id} />
      ) : null}
    </div>
  );
}

export default ProductDetailTable;
