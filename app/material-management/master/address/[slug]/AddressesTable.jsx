"use client";
import MyDataTable from "app/components/MyDataTable/MyDataTable";
import React from "react";

export default function AddressesTable({ rows, columns, loading }) {
  return (
    <MyDataTable
      loading={loading === "fetching"}
      data={rows}
      columns={columns}
    />
  );
}
