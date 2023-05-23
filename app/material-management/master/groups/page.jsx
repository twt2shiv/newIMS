"use client";
import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { tableRows } from "/app/utils/tableRows.js";
import { imsAxios } from "app/utils/axiosInterceptor";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLoading } from "/app/store";
// my components
import AddGroupForm from "./AddGroupForm";
import GroupsTable from "./GroupsTable";
import DownloadButton from "/app/components/FloatingButtons/DownloadButton";

// groups table columns
const columns = [
  {
    headerName: "#",
    field: "index",
    width: 50,
  },
  {
    headerName: "Group Name",
    field: "group_name",
    flex: 1,
  },
  {
    headerName: "Insert Date",
    field: "group_insert_dt",
    width: 150,
  },
];

function page() {
  const [rows, setRows] = useState([]);
  const { loading } = useSelector((state) => state.imsData);
  const dispatch = useDispatch();

  // getting groupd table rows
  const getRows = async () => {
    dispatch(setLoading("fetching"));
    const data = await imsAxios.get("/groups/allGroups");
    dispatch(setLoading(false));
    const arr = tableRows(data.data);
    setRows(arr);
  };
  useEffect(() => {
    getRows();
  }, []);
  return (
    <Row gutter={6} style={{ height: "92%" }}>
      <DownloadButton
        type="standard"
        rows={rows}
        columns={columns}
        name="Groups Report"
      />
      <Col span={8}>
        <AddGroupForm getRows={getRows} loading={loading} />
      </Col>
      <Col span={10}>
        <GroupsTable loading={loading} rows={rows} columns={columns} />
      </Col>
    </Row>
  );
}

export default page;
