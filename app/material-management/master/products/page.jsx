"use client";
import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "/app/store";
import { tableRows, getSelectOptions } from "/app/utils/tableRows.js";
import { useRouter } from "next/navigation";
import { imsAxios } from "app/utils/axiosInterceptor";

// my components
import AddProjectForm from "./AddProjectForm";
import ProductsTable from "./ProductsTable";
import Images from "./Images";
import DownloadButton from "/app/components/FloatingButtons/DownloadButton";
import { GridActionsCellItem } from "@mui/x-data-grid";
import MyToolTip from "/app/components/MyToolTip/MyToolTip";
import AddImageForm from "./AddImageForm";

let uomOptions = [];
// getting uom options
const getUOMOptions = async () => {
  const data = await imsAxios.post("/uom/uomSelect2");
  let arr = getSelectOptions(data.data);
  uomOptions = arr;
};

export default function page() {
  const [rows, setRows] = useState([]);
  const [showImages, setShowImages] = useState(false);
  const [refreshImages, setRefreshImages] = useState(false);
  const { loading } = useSelector((state) => state.imsData);
  const dispatch = useDispatch();
  const router = useRouter();
  // getting rows
  const getRows = async () => {
    dispatch(setLoading("fetchingRows"));
    const fgData = await imsAxios.get("/products");
    const sfgData = await imsAxios.get("products/semiProducts");
    let fgArr = fgData.data.map((row) => ({
      ...row,
      type: "Finsihed Goods",
    }));
    let sfgArr = sfgData.data.map((row) => ({
      ...row,
      type: "Semi-Finsihed Goods",
    }));
    dispatch(setLoading(false));
    let arr = tableRows([...fgArr, ...sfgArr]);
    setRows(arr);
  };

  // product table columns
  const columns = [
    {
      headerName: "#",
      field: "index",
      width: 60,
    },
    {
      headerName: "Name",
      field: "p_name",
      flex: 1,
    },
    {
      headerName: "SKU",
      field: "p_sku",
      width: 150,
      renderCell: ({ row }) => <MyToolTip text={row.p_sku} copy={true} />,
    },
    {
      headerName: "UOM",
      field: "units_name",
      width: 90,
    },
    {
      headerName: "Type",
      field: "type",
      width: 150,
    },
    {
      headerName: "",
      field: "actions",
      width: 30,
      type: "actions",
      getActions: ({ row }) => [
        <GridActionsCellItem
          showInMenu
          onClick={() => {
            router.push(
              `/material-management/master/products/edit/${row?.product_key}`
            );
          }}
          label="Edit"
        />,
        <GridActionsCellItem
          showInMenu
          onClick={() => {
            setShowImages({
              productKey: row?.product_key,
              productName: row?.p_name,
              productSku: row?.p_sku,
            });
          }}
          label="View Images"
        />,
      ],
    },
  ];
  useEffect(() => {
    document.title = "Master | Products";
    getUOMOptions();
    getRows();
  }, []);
  return (
    <Row gutter={6} style={{ height: "92%" }}>
      <DownloadButton
        type="standard"
        rows={rows}
        columns={columns}
        name="Finished Goods Report"
      />
      <Col span={8}>
        <Row gutter={[0, 4]}>
          <Col span={24}>
            <AddProjectForm uomOptions={uomOptions} getRows={getRows} />
          </Col>

          {showImages && (
            <Col span={24}>
              <AddImageForm
                product={showImages}
                setRefreshImages={setRefreshImages}
              />
            </Col>
          )}
        </Row>
      </Col>
      <Col span={10}>
        <ProductsTable
          rows={rows}
          columns={columns}
          loading={loading === "fetchingRows"}
        />
      </Col>
      {showImages && (
        <Col span={6}>
          <Images
            refreshImages={refreshImages}
            setRefreshImages={setRefreshImages}
            product={showImages}
          />
        </Col>
      )}
    </Row>
  );
}
