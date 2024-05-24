import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

function ProductTable({ value }) {
  return (
    <div className="overflow-auto p-4">
      <table className="border-collapse border-2 border-[#056674] w-full">
        <thead>
          <tr>
            <th className="border-2 border-[#056674] p-2 text-center text-[#056674]">
              Sr No.
            </th>
            <th className="border-2 border-[#056674] p-2 text-center text-[#056674]">
              Product Category
            </th>
            <th className="border-2 border-[#056674] p-2 text-center text-[#056674]">
              Product Name
            </th>
            <th className="border-2 border-[#056674] p-2 text-center text-[#056674]">
              Product Serial No.
            </th>
            <th className="border-2 border-[#056674] p-2 text-center text-[#056674]">
              Product Model No.
            </th>
            <th className="border-2 border-[#056674] p-2 text-center text-[#056674]">
              Image
            </th>
          </tr>
        </thead>
        <tbody>
          {value.map((product, idx) => (
            <tr key={idx}>
              <td className="border-2 border-[#056674] p-2 text-center">
                {idx + 1}
              </td>
              <td className="border-2 border-[#056674] p-2 text-center">
                {product.Category || "--"}
              </td>
              <td className="border-2 border-[#056674] p-2 text-center">
                {product.ProductName || "--"}
              </td>
              <td className="border-2 border-[#056674] p-2 text-center">
                {product.Serial_No || "--"}
              </td>
              <td className="border-2 border-[#056674] p-2 text-center">
                {product.Model_No || "--"}
              </td>
              <td className="border-2 border-[#056674] p-2 text-center">
                {product.Model_Image ? (
                  <img
                    src={product.Model_Image}
                    alt="Model"
                    className="h-20 w-20 object-cover mx-auto"
                  />
                ) : (
                  "--"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ViewCustomersAllProducts({
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

  const handleClose = () => {
    setView(!view);
    setId(null);
  };

  const columns = [
    { id: "ProductDetails", label: "Product Details", minWidth: "100%" },
  ];

  return (
    <div className="bg-black bg-center bg-cover fixed inset-0 bg-opacity-60 z-50 p-10 flex flex-col items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-5xl">
        <div className="flex justify-end">
          <button
            className="bg-[#66BFBF] hover:bg-[#135D66] p-2 text-lg text-white rounded-full"
            onClick={handleClose}
          >
            <RxCross1 />
          </button>
        </div>
        <Paper className="dark:bg-[#0f161b] dark:text-[#5C8374] text-[#003C4C] mt-4">
          <TableContainer sx={{ maxHeight: "70vh" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align="center"
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
                {data.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="text-center py-4"
                    >
                      No data found...
                    </TableCell>
                  </TableRow>
                ) : (
                  data
                    .filter((e) => e.id === id)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
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
                              align="center"
                              className="dark:text-[#F39422] text-xl"
                            >
                              {column.id === "ProductDetails" ? (
                                value.length !== 0 ? (
                                  <ProductTable value={value} />
                                ) : (
                                  "---"
                                )
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
        </Paper>
      </div>
    </div>
  );
}

export default ViewCustomersAllProducts;
