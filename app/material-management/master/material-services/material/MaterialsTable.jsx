import MyDataTable from "/app/components/MyDataTable/MyDataTable";

function MaterialsTable({ rows, loading, columns }) {
  return (
    <>
      <MyDataTable rows={rows} columns={columns} loading={loading} />
    </>
  );
}

export default MaterialsTable;
