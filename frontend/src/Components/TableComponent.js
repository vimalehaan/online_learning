import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const TableComponent = ({ columns, rows }) => {
  return (
      <TableContainer component={Paper} sx={{ borderRadius: '15px', boxShadow: 5 }}>
        <Table sx={{ }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((col, index) => (
                  <TableCell key={index} sx={{fontSize: '15px', fontWeight: 'bold'}}>{col}</TableCell>

              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
                <TableRow key={index}>
                  {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                  ))}
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default TableComponent;
