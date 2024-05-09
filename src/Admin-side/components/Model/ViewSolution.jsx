import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IoIosCloseCircle } from "react-icons/io";

function ProductDetailTable({ data, setView, view, id }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClose = () => {
    setView(!view);
  };
  const columns = [
    { id: "Image", label: "Image", minWidth: 150 },
    { id: "id", label: "Id", maxWidth: 50 },
    { id: "ProductName", label: "ProductName" },
    { id: "Category", label: "Category" },
    { id: "Model_No", label: "Model_No" },
    { id: "Serial_No", label: "Serial_No" },
    { id: "Allissues", label: "Related Issue" },
    { id: "Allissues", label: "Text Solution", minWidth: 450 },
    { id: "Allissues", label: "Video Solution" },
    { id: "Allissues", label: "Pdf Solution" },
  ];

  return (
    <div className="fixed inset-0 bg-cover bg-center flex flex-col items-center justify-center h-screen bg-black bg-opacity-50 z-50">
      <div className=" w-11/12">
        <div className=" w-full flex items-center justify-center text-3xl text-[#ffffff]">
          Full Details
        </div>
        <div className=" w-full flex items-center justify-end">
          <IoIosCloseCircle
            size={40}
            className="text-[#ffffff] cursor-pointer"
            onClick={() => handleClose()}
          />
        </div>
        <Paper sx={{}}>
          <TableContainer sx={{ maxHeight: 440 }}>
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
                  .filter((e) => e.id === id)
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
                            {column.id === "Image" ? (
                              <img
                                src={value}
                                alt="ProductImage"
                                className="w-20 h-20"
                              />
                            ) : column.id === "Allissues" &&
                              column.label === "Related Issue" ? (
                              value.map((e, i) => (
                                <p key={i} className=" p-2">
                                  <span>
                                    {i + 1}
                                    {"."}
                                  </span>
                                  <span className="ml-2">{e.issue}</span>
                                </p>
                              ))
                            ) : column.id === "Allissues" &&
                              column.label === "Text Solution" ? (
                              value.map((e, i) => (
                                <pre
                                  key={i}
                                  className="text-justify w-96 h-48 overflow-auto text-wrap p-2"
                                >
                                  {e.text}
                                </pre>
                              ))
                            ) : column.id === "Allissues" &&
                              column.label === "Video Solution" ? (
                              value.map((e, i) => {
                                // Extract videoId from the YouTube URL
                                const videoId = e.video
                                  .split("/")
                                  .slice(-1)[0]
                                  .split("?")[0];
                                console.log("Video ID:", videoId); // Add this line
                                return (
                                  <div className="w-64 h-40 m-2">
                                    <iframe
                                      key={i}
                                      src={`https://www.youtube.com/embed/${videoId}`}
                                      title={`Video ${i}`}
                                      width="100%"
                                      height="100%"
                                      frameborder="0"
                                      allowfullscreen
                                    />
                                  </div>
                                );
                              })
                            ) : column.id === "Allissues" &&
                              column.label === "Pdf Solution" ? (
                              value.map((e, i) => {
                                console.log(e.pdf);
                                return (
                                  <div className="w-64 h-40 m-2">
                                    <div className=" bg-[#E0ECE4] ">
                                      <iframe
                                        src={e.pdf}
                                        className="h-full w-full"
                                        title="PDF Viewer"
                                      />
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              value
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
      </div>
    </div>
  );
}

export default ProductDetailTable;
