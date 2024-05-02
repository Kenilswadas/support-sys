import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

function SupportTicketTable({ Ticket }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const columns = [
    { id: "Sr No.", label: "Sr No.", minWidth: 50 },
    { id: "Ticket Id", label: "Ticket Id", minWidth: 50 },
    { id: "Name", label: "Name", minWidth: 50 },
    { id: "Email Id", label: "Email Id", minWidth: 50 },
    { id: "Category", label: "Category", minWidth: 50 },
    { id: "SubCategory", label: "SubCategory", minWidth: 50 },
    { id: "Model No", label: "Model No", minWidth: 50 },
    { id: "Serial No", label: "Serial No", minWidth: 50 },
    { id: "Issue", label: "Issue", minWidth: 50 },
    { id: "Status", label: "Status", minWidth: 50 },
  ];
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
                        {value}
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
  );
}

export default SupportTicketTable;
