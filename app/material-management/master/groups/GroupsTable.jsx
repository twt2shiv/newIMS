"use client";
import MyDataTable from "app/components/MyDataTable/MyDataTable";
import React from "react";

export default function GroupsTable({ rows, columns, loading }) {
  return (
    <MyDataTable
      data={rows}
      columns={columns}
      loading={loading === "fetching"}
    />
  );
}
