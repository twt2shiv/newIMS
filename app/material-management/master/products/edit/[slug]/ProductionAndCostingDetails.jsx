"use client";
import { Col, Descriptions, Form, Input, Row } from "antd";
// my components
import MySkeletonLoader from "app/components/MySkeletonLoader/MySkeletonLoader";

export default function ProductionAndCostingDetails({ loading }) {
  return (
    <Row gutter={6} style={{ width: "80%" }}>
      <Col span={24}>
        <Descriptions title="Production Plan and Costing" />
      </Col>
      {/* min stock fg*/}
      <Col span={6}>
        <Form.Item label="Min Stock FG" name="minStockFG">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <Input />}
        </Form.Item>
      </Col>

      {/* Min Stock RM */}
      <Col span={6}>
        <Form.Item label="Min Stock RM" name="minStockRM">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <Input />}
        </Form.Item>
      </Col>

      {/* MFG Batch Size*/}
      <Col span={6}>
        <Form.Item label="MFG Batch Size" name="mfgBatchSize">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <Input />}
        </Form.Item>
      </Col>

      {/* Default Stock Location */}
      <Col span={6}>
        <Form.Item label="Default Stock Location" name="stockLocation">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <Input />}
        </Form.Item>
      </Col>

      {/* labour cost */}
      <Col span={6}>
        <Form.Item label="Labour Cost" name="labourCost">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <Input />}
        </Form.Item>
      </Col>

      {/* Sec packing cost */}
      <Col span={6}>
        <Form.Item label="Sec Packing Cost" name="secPackingCost">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <Input />}
        </Form.Item>
      </Col>

      {/* Jobwork cost */}
      <Col span={6}>
        <Form.Item label="Job Work Cost" name="jwcost">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <Input />}
        </Form.Item>
      </Col>

      {/* other cost */}
      <Col span={6}>
        <Form.Item label="Other Cost" name="otherCost">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <Input />}
        </Form.Item>
      </Col>
    </Row>
  );
}
