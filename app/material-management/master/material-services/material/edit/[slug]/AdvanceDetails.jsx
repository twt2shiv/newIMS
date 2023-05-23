"use client";
import { Col, Descriptions, Form, Input, Row } from "antd";
// my components
import MySkeletonLoader from "app/components/MySkeletonLoader/MySkeletonLoader";

export default function AdvanceDetails({ loading }) {
  return (
    <Row gutter={6} style={{ width: "80%" }}>
      <Col span={24}>
        <Descriptions title="Advance Details" />
      </Col>
      {/* Brand */}
      <Col span={6}>
        <Form.Item label="Brand" name="brand">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <Input />}
        </Form.Item>
      </Col>

      {/* EAN */}
      <Col span={6}>
        <Form.Item label="EAN" name="ean">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <Input />}
        </Form.Item>
      </Col>

      {/* Weight */}
      <Col span={6}>
        <Form.Item label="Weight(gm)" name="weight">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <Input />}
        </Form.Item>
      </Col>

      {/* blank */}
      <Col span={6}></Col>

      {/* volumetric weight */}
      <Col span={6}>
        <Form.Item label="Volumetric Weight" name="volumetricWeight">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <Input />}
        </Form.Item>
      </Col>

      {/* height */}
      <Col span={6}>
        <Form.Item label="Height(mm)" name="height">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <Input />}
        </Form.Item>
      </Col>

      {/* Width */}
      <Col span={6}>
        <Form.Item label="Width(mm)" name="width">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <Input />}
        </Form.Item>
      </Col>

      {/* blank */}
      <Col span={6}></Col>
    </Row>
  );
}
