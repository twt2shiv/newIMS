"use client";
import { useEffect, useState } from "react";
import { Row, Col, Card, Tree } from "antd";
import { imsAxios } from "../../../utils/axiosInterceptor";
import { v4 } from "uuid";
import { setLoading } from "/app/store";
// my components
import AddLocationForm from "./AddLocationForm";
import LocationTree from "./LocationTree";
import { useDispatch, useSelector } from "react-redux";

export default function page() {
  const [treeData, setTreeData] = useState([]);
  const { loading } = useSelector((state) => state.imsData);
  const dispatch = useDispatch();
  // getting locations
  const getLocations = async () => {
    dispatch(setLoading("fetching"));
    const data = await imsAxios.post("/location/fetchLocationTree");
    dispatch(setLoading(false));
    flatArray(data.data);
  };
  // converting nested into flat array
  const flatArray = (array) => {
    let arr = [];
    array?.map((row) => {
      if (row.nodes || row.children) {
        // delete row.nodes;]
        row.children = row.children;
        row.title = row.name;
        row.key = v4();
        arr = [...arr, { ...row }];
        flatArray(row.children);
      } else {
        row.title = row.name;
        row.key = v4();
        arr = [...arr, { ...row }];
      }
    });
    setTreeData(arr);
  };
  // getting locations on page load
  useEffect(() => {
    getLocations();
  }, []);
  return (
    <Row gutter={6} style={{ height: "94%", position: "relative" }}>
      <Col span={8}>
        <AddLocationForm loading={loading} getLocations={getLocations} />
      </Col>
      <Col span={10}>
        <LocationTree loading={loading} treeData={treeData} />
      </Col>
    </Row>
  );
}
