"use client";
import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { useParams } from "next/navigation";
import { tableRows, getSelectOptions } from "/app/utils/tableRows.js";
import { imsAxios } from "app/utils/axiosInterceptor";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "/app/store";
// my components
import AddAddressForm from "./AddAddressForm";
import AddressesTable from "./AddressesTable";
import DownloadButton from "/app/components/FloatingButtons/DownloadButton";

// address table columns
const columns = [
  {
    headerName: "#",
    field: "index",
    width: 40,
  },
  {
    headerName: "Label",
    field: "label",
    flex: 1,
  },
  {
    headerName: "Company",
    field: "company",
    flex: 1,
  },
  {
    headerName: "State",
    field: "state",
    flex: 1,
  },
  {
    headerName: "PAN",
    field: "pan",
    flex: 1,
  },
  {
    headerName: "GSTIN",
    field: "gst",
    flex: 1,
  },
  {
    headerName: "CIN",
    field: "cin",
    flex: 1,
  },
  {
    headerName: "Register Date",
    field: "insert_dt",
    flex: 1,
  },
];

export default function page() {
  const [rows, setRows] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.imsData);

  // getting address rows
  const getRows = async () => {
    let link = "";
    if (params.slug === "billing") {
      link = "/billingAddress/getAll";
    } else {
      link = "/shippingAddress/getAll";
    }
    dispatch(setLoading("fetching"));
    const data = await imsAxios.get(link);
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
        name={`${params.slug} Address Report`}
      />
      <Col span={8}>
        <AddAddressForm loading={loading} slug={params.slug} />
      </Col>
      <Col span={16}>
        <AddressesTable
          loading={loading}
          slug={params.slug}
          rows={rows}
          columns={columns}
        />
      </Col>
    </Row>
  );
}
