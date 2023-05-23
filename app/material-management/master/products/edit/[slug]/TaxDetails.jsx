"use client";
import { Col, Descriptions, Form, Row, Input } from "antd";
import { gstRateOptions, gstTaxTypeOptions } from "public/utils/selectOptions";
// my components
import MySelect from "app/components/Select/MySelect/MySelect";
import MySkeletonLoader from "app/components/MySkeletonLoader/MySkeletonLoader";

// tax type options
const taxTypeOptions = [
  { text: "Exempted", value: "EXE" },
  { text: "Regular", value: "REG" },
];

export default function TaxDetails({ loading }) {
  return (
    <Row gutter={6} style={{ width: "80%" }}>
      <Col span={24}>
        <Descriptions title="Tax Details" />
      </Col>
      {/* Tax type */}
      <Col span={6}>
        <Form.Item label="Tax Type" name="taxType">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <MySelect options={taxTypeOptions} />}
        </Form.Item>
      </Col>

      {/* GST rate */}
      <Col span={6}>
        <Form.Item label="GST Rate" name="taxRate">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <MySelect options={gstRateOptions} />}
        </Form.Item>
      </Col>

      {/*HSN code */}
      <Col span={6}>
        <Form.Item label="HSN" name="hsn">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <Input />}
        </Form.Item>
      </Col>
    </Row>
  );
}
