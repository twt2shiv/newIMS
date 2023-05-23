"use client";
import { Col, Row } from "antd";
import { imsAxios } from "app/utils/axiosInterceptor";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "/app/store";
import { tableRows, getSelectOptions } from "/app/utils/tableRows.js";
import { useRouter } from "next/navigation";
// my components
import MaterialsTable from "./MaterialsTable";
import DownloadButton from "/app/components/FloatingButtons/DownloadButton";
import AddMaterialForm from "./AddMaterialForm";
import TableActions from "/app/components/TableActions/TableActions";

let uomOptions = [];
let groupOptions = [];
const typeOptions = [
  { text: "Component", value: "C" },
  { text: "Other", value: "O" },
];
// getting uom options
const getUOMOptions = async () => {
  const data = await imsAxios.post("/uom/uomSelect2");
  let arr = getSelectOptions(data.data);
  uomOptions = arr;
};
// getting group options
const getGroupOptions = async () => {
  const data = await imsAxios.post("/groups/groupSelect2");
  let arr = getSelectOptions(data.data);
  groupOptions = arr;
};

export default function Material() {
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.imsData);
  const router = useRouter();

  const getRows = async () => {
    setRows([]);
    dispatch(setLoading("fetch"));
    const data = await imsAxios.get("/component");
    dispatch(setLoading(false));
    let arr = tableRows(data.data);
    setRows(arr);
  };

  // for material tables on the right
  const columns = [
    { headerName: "#", field: "index", width: 60 },
    { headerName: "Part Code", field: "c_part_no", width: 120 },
    { headerName: "Name", field: "c_name", flex: 1 },
    { headerName: "UOM", field: "units_name", width: 100 },
    {
      headerName: "Actions",
      type: "actions",
      width: 300,
      getActions: ({ row }) => [
        // Edit icon
        <TableActions
          action="edit"
          onClick={() =>
            router.push(
              `/material-management/master/material-services/material/edit/${row?.component_key}`
            )
          }
        />,
      ],
    },
  ];

  useEffect(() => {
    getRows();
    getUOMOptions();
    getGroupOptions();
    document.title = "Master | Materials";
  }, []);
  return (
    <Row style={{ height: "94%", position: "relative" }} gutter={6}>
      <DownloadButton
        type="standard"
        rows={rows}
        columns={columns}
        name="Materials Report"
      />
      <Col span={8}>
        <AddMaterialForm
          uomOptions={uomOptions}
          groupOptions={groupOptions}
          typeOptions={typeOptions}
          getRows={getRows}
        />
      </Col>
      <Col span={16} style={{ height: "100%" }}>
        <MaterialsTable
          rows={rows}
          loading={loading === "fetch"}
          columns={columns}
        />
      </Col>
    </Row>
  );
}
