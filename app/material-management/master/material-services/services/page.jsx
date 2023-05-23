"use client";
import { imsAxios } from "app/utils/axiosInterceptor";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "/app/store";
import { tableRows, getSelectOptions } from "/app/utils/tableRows.js";
// my components
import DownloadButton from "/app/components/FloatingButtons/DownloadButton";
import ServicesTable from "./ServicesTable";
import AddServicesForm from "./AddServicesForm";
import { Col, Row } from "antd";

let uomOptions = [];
// getting uom options
const getUOMOptions = async () => {
  const data = await imsAxios.post("/uom/uomSelect2");
  let arr = getSelectOptions(data.data);
  uomOptions = arr;
};

// for services table on the right
const columns = [
  { headerName: "Sr. No", field: "index", width: 60 },
  { headerName: "Service Code", field: "c_part_no", width: 120 },
  { headerName: "Service", field: "c_name", flex: 1 },
  { headerName: "UOM", field: "units_name", width: 100 },
  // {headerName: "Actions", field: "c_name", flex: 1},
];

export default function Services() {
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.imsData);

  const getRows = async () => {
    setRows([]);
    dispatch(setLoading("fetch"));
    const data = await imsAxios.get("/component/service");
    dispatch(setLoading(false));
    console.log(data.data);
    let arr = tableRows(data.data);
    setRows(arr);
  };

  useEffect(() => {
    getRows();
    getUOMOptions();
    document.title = "Master | Services";
  }, []);
  return (
    <Row style={{ height: "92%" }} gutter={6}>
      <DownloadButton
        type="standard"
        rows={rows}
        columns={columns}
        name="Services Report"
      />
      <Col span={8}>
        <AddServicesForm uomOptions={uomOptions} />
      </Col>
      <Col span={16}>
        <ServicesTable
          rows={rows}
          loading={loading === "fetch"}
          columns={columns}
        />
      </Col>
    </Row>
  );
}
