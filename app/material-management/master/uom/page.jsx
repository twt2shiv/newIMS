"use client";
import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { imsAxios } from "app/utils/axiosInterceptor";
// my components
import UOMTable from "./UOMTable";
import UOMForm from "./UOMForm";
import DownloadButton from "/app/components/FloatingButtons/DownloadButton";
import { setLoading } from "/app/store";
import { useDispatch, useSelector } from "react-redux";

// export const metadata = {
//   title: "UOM",
//   description: "Units of measurement",
// };

const columns = [
  { headerName: "Sr. No", field: "id", width: 80 },
  { headerName: "Unit Name", field: "units_name", flex: 1 },
  { headerName: "Unit Specificatioin", field: "units_details", flex: 1 },
  { headerName: "Created On", field: "insert_date", flex: 1 },
];

function UOM() {
  // document.title = "UOM";
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.imsData);

  const getRows = async () => {
    dispatch(setLoading("fetch"));
    const data = await imsAxios.post("/uom");
    const arr = data.data.map((row) => ({
      ...row,
      id: row.ID,
    }));
    dispatch(setLoading(false));
    setRows(arr);
  };
  useEffect(() => {
    getRows();
    document.title = "Master | UOM";
  }, []);
  return (
    <Row style={{ height: "90%" }} gutter={6}>
      <DownloadButton
        type="standard"
        rows={rows}
        columns={columns}
        name="UOM Report"
      />
      <Col span={6}>
        <UOMForm getRows={getRows} />
      </Col>
      <Col span={10}>
        <UOMTable loading={loading === "fetch"} columns={columns} rows={rows} />
      </Col>
    </Row>
  );
}

export default UOM;
