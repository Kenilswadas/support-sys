import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IoIosCloseCircle } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

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
    { id: "Sr No.", label: "Sr No.", maxWidth: 50 },
    { id: "id", label: "Id", maxWidth: 50 },
    { id: "ProductName", label: "ProductName" },
    { id: "Category", label: "Category" },
    { id: "ModelDetails", label: "Model_No" },
    { id: "ModelDetails", label: "Image", minWidth: 150 },
    { id: "Serial_No", label: "Serial_No" },
    { id: "Allissues", label: "Related Issue" },
    { id: "Allissues", label: "Text Solution", minWidth: 450 },
    { id: "Allissues", label: "Video Solution" },
    { id: "Allissues", label: "Pdf Solution" },
    // { id: "Customers", label: "Buyer_Mobile_No" },
  ];

  return (
    <div className="bg-black bg-center bg-cover fixed inset-0 bg-opacity-60 z-50 p-10 flex flex-col items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-10xl">
        <div className="flex justify-end">
          <button
            className="bg-[#66BFBF] hover:bg-[#135D66] p-2 text-lg text-white rounded-full"
            onClick={handleClose}
          >
            <RxCross1 />
          </button>
        </div>
        <div className=" w-full flex items-center justify-center text-3xl text-[#056674] mb-2">
          Full Details
        </div>

        <Paper
          sx={{}}
          className="dark:bg-[#0f161b] dark:text-[#5C8374] text-[#003C4C] mt-4"
        >
          <TableContainer sx={{ maxHeight: "60vh" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align="left"
                      style={{
                        backgroundColor: "#056674",
                        color: "white",
                        minWidth: column.minWidth,
                        fontFamily: "revert",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                      className="dark:bg-[#0f161b] dark:text-[#5C8374]"
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
                            {column.id === "Sr No." ? (
                              <p className="text-2xl">{index}</p>
                            ) : column.id === "ModelDetails" &&
                              column.label === "Image" ? (
                              <>
                                {value.map((e) => {
                                  return (
                                    <img
                                      src={e.Model_Image}
                                      alt="ProductImage"
                                      className="w-full h-full border-2 border-[#E0ECE4] "
                                    />
                                  );
                                })}
                              </>
                            ) : column.id === "ModelDetails" &&
                              column.label === "Model_No" ? (
                              <>
                                {value.map((e) => {
                                  return (
                                    <p className="p-2 border-2 border-[#E0ECE4] flex items-center justify-center w-20 h-20">
                                      {e.Model_No}
                                    </p>
                                  );
                                })}
                              </>
                            ) : column.id === "Serial_No" ? (
                              <>
                                {value.map((e) => {
                                  return (
                                    <p className="p-2 border-2 border-[#E0ECE4] flex items-center justify-center ">
                                      {e}
                                      {","}
                                    </p>
                                  );
                                })}
                              </>
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
                                  className="text-justify w-96 h-48 overflow-auto text-wrap p-8 m-2 border-2 border-[#056674]"
                                >
                                  {e.text}
                                </pre>
                              ))
                            ) : column.id === "Allissues" &&
                              column.label === "Video Solution" ? (
                              value.map((issue, i) => {
                                const videoId =
                                  issue.video !== ""
                                    ? issue.video
                                        .split("/")
                                        .slice(-1)[0]
                                        .split("?")[0]
                                    : null;
                                return videoId ? (
                                  <div className="w-64 h-48 p-2 m-2 border-2 border-[#056674]">
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
                                ) : (
                                  <p className="w-64 h-48 p-2 m-2 border-2 border-[#056674] justify-center flex items-center">
                                    {" "}
                                    No Video Solution Available....
                                  </p>
                                );
                              })
                            ) : column.id === "Allissues" &&
                              column.label === "Pdf Solution" ? (
                              value.map((issue, i) => {
                                return issue.pdf.length !== 0 ? (
                                  <div className="w-96 h-full p-4 m-2 border border-teal-600 rounded-lg">
                                    <iframe
                                      src={issue.pdf}
                                      className="w-full h-full"
                                      title="PDF Viewer"
                                    />
                                  </div>
                                ) : (
                                  <p className="w-64 h-48 p-2 m-2 border-2 border-[#056674] justify-center flex items-center">
                                    {" "}
                                    No Pdf Solution Available....
                                  </p>
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
