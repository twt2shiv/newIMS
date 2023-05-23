"use client";
import MyDataTable from "app/components/MyDataTable/MyDataTable";

export default function ProductsTable({ rows, loading, columns }) {
  return <MyDataTable data={rows} columns={columns} loading={loading} />;
}
