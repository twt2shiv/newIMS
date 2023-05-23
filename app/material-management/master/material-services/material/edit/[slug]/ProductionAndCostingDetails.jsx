"use client";
import { Col, Descriptions, Form, Input, Row } from "antd";
import MySelect from "app/components/Select/MySelect/MySelect";
import { booleanSelectOptions } from "../../../../../../../public/utils/selectOptions";
// my components
import MySkeletonLoader from "app/components/MySkeletonLoader/MySkeletonLoader";

export default function ProductionAndCostingDetails({ loading }) {
  return (
    <Row gutter={6} style={{ width: "80%" }}>
      <Col span={24}>
        <Descriptions title="Production Plan and Costing" />
      </Col>
      {/* min stock */}
      <Col span={6}>
        <Form.Item label="Min Stock" name="minStock">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <Input />}
        </Form.Item>
      </Col>

      {/* max stock */}
      <Col span={6}>
        <Form.Item label="Max Stock" name="maxStock">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <Input />}
        </Form.Item>
      </Col>

      {/* min order */}
      <Col span={6}>
        <Form.Item label="Min Order" name="minOrder">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <Input />}
        </Form.Item>
      </Col>

      {/* lead time */}
      <Col span={6}>
        <Form.Item label="Lead Time(Days)" name="leadTime">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <Input />}
        </Form.Item>
      </Col>

      {/* enable alert */}
      <Col span={6}>
        <Form.Item label="Enable Alert?" name="enableAlert">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && (
            <MySelect options={booleanSelectOptions} />
          )}
        </Form.Item>
      </Col>

      {/* purchase cost */}
      <Col span={6}>
        <Form.Item label="Purchase Cost" name="purchaseCost">
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

      {/* blank */}
      <Col span={6}></Col>
    </Row>
  );
}
