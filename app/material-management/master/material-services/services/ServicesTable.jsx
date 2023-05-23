"use client";
import MyDataTable from "/app/components/MyDataTable/MyDataTable";

export default function ServicesTable({ rows, loading, columns }) {
  return (
    <>
      <MyDataTable rows={rows} columns={columns} loading={loading} />
    </>
  );
}
