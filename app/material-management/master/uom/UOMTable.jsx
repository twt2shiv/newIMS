import MyDataTable from "app/components/MyDataTable/MyDataTable";
import React from "react";

export default function UOMTable({ columns, rows, loading }) {
  return (
    <>
      <MyDataTable loading={loading} columns={columns} data={rows} />
    </>
  );
}
