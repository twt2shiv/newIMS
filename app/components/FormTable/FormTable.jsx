import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Card } from "antd";
import React, { useEffect, useState } from "react";
// import Loading from "./Loading";

export default function FormTable({ columns, data, loading }) {
  // const [headers, setHeaders] = useState([]);
  // const [cells, setCells] = useState([]);
  // useEffect(() => {
  //   let arr = columns.map((row) => {
  //     return row.headerName;
  //   });
  //   let arr1 = columns.map((row) => {
  //     return row.renderCell({ row });
  //   });
  //   setHeaders(arr);
  //   setCells(arr1);
  // }, [columns]);

  return (
    <TableContainer style={{ height: "100%", border: "1px solid white" }}>
      <Card
        size="small"
        style={{ width: "100%", height: "100%" }}
        bodyStyle={{
          padding: 0,
          height: "100%",
          width: "100%",
          overflow: "auto",
        }}
      >
        <Table
          stickyHeader
          sx={{ width: "100%", overflowX: "auto" }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {columns.map((row, index) => (
                <TableCell
                  sx={{
                    width: `${row.width && row.width}px !important`,
                    maxWidth: `${row.width && row.width}px !important`,
                    minWidth: `${row.width && row.width}px !important`,
                    background: "rgb(240, 240, 240)",
                    paddingTop: 0,
                    paddingBottom: 0,
                    fontSize: 12,
                  }}
                  key={index}
                  component="th"
                >
                  {row.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ background: row.error ? "#FF9494" : "white" }}
              >
                {columns.map((col, index) => (
                  <TableCell
                    key={index}
                    size="small"
                    sx={{
                      width: `${row?.width && row?.width}px !important`,
                      justifyContent: "center",
                      // padding: "2px -5px",

                      border: "none",
                    }}
                  >
                    {col.renderCell({ row })}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </TableContainer>
  );
}
