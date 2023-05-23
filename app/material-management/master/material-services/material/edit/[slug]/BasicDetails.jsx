"use client";
import { useEffect, useState } from "react";
import { Col, Descriptions, Form, Input, Row } from "antd";
// utils components and functions
import MySelect from "app/components/Select/MySelect/MySelect";
import { imsAxios } from "app/utils/axiosInterceptor";
import { getSelectOptions } from "app/utils/tableRows.js";
// import options array
import { booleanSelectOptions } from "public/utils/selectOptions";
import MySkeletonLoader from "app/components/MySkeletonLoader/MySkeletonLoader";

export default function BasicDetails({ loading }) {
  const [uomOptions, setUomOptions] = useState([]);
  const [groupOptions, setGroupOptions] = useState([]);

  // getting uom options
  const getUOMOptions = async () => {
    const data = await imsAxios.post("/uom/uomSelect2");
    let arr = getSelectOptions(data.data);
    setUomOptions(arr);
  };
  // getting group options
  const getGroupOptions = async () => {
    const data = await imsAxios.post("/groups/groupSelect2");
    let arr = getSelectOptions(data.data);
    setGroupOptions(arr);
  };

  useEffect(() => {
    getUOMOptions();
    getGroupOptions();
  }, []);
  return (
    <Row gutter={6} style={{ width: "80%" }}>
      <Col span={24}>
        <Descriptions title="Basic Details" />
      </Col>
      {/* part code */}
      <Col span={6}>
        <Form.Item label="Part Code" name="code">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <Input disabled />}
        </Form.Item>
      </Col>

      {/* component name */}
      <Col span={6}>
        <Form.Item label="Material Name" name="name">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <Input />}
        </Form.Item>
      </Col>

      {/* UOM */}
      <Col span={6}>
        <Form.Item label="Unit of Measurement" name="uom">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <MySelect options={uomOptions} />}
        </Form.Item>
      </Col>

      {/* MRP */}
      <Col span={6}>
        <Form.Item label="MRP" name="mrp">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <Input />}
        </Form.Item>
      </Col>

      {/* Component group */}
      <Col span={6}>
        <Form.Item label="Group" name="group">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <MySelect options={groupOptions} />}
        </Form.Item>
      </Col>

      {/* Enabled Status */}
      <Col span={6}>
        <Form.Item label="Enabled" name="isEnabled">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && (
            <MySelect options={booleanSelectOptions} />
          )}
        </Form.Item>
      </Col>

      {/* Job Work */}
      <Col span={6}>
        <Form.Item label="Job Work Rate" name="jobWorkRate">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <Input />}
        </Form.Item>
      </Col>

      {/* QC Status */}
      <Col span={6}>
        <Form.Item label="QC Status" name="qcStatus">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && (
            <MySelect options={booleanSelectOptions} />
          )}
        </Form.Item>
      </Col>

      {/* Description */}
      <Col span={24}>
        <Form.Item label="Description" name="description">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <Input.TextArea rows={3} />}
        </Form.Item>
      </Col>
    </Row>
  );
}
