"use client";
import { Col, Descriptions, Form, Row } from "antd";
import {
  gstRateOptions,
  gstTaxTypeOptions,
} from "../../../../../../../public/utils/selectOptions";
// my components
import MySelect from "app/components/Select/MySelect/MySelect";
import MySkeletonLoader from "app/components/MySkeletonLoader/MySkeletonLoader";

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
          {loading !== "fetching" && <MySelect options={gstTaxTypeOptions} />}
        </Form.Item>
      </Col>

      {/* GST rate */}
      <Col span={6}>
        <Form.Item label="GST Rate" name="taxRate">
          {loading === "fetching" && <MySkeletonLoader block={true} />}
          {loading !== "fetching" && <MySelect options={gstRateOptions} />}
        </Form.Item>
      </Col>
    </Row>
  );
}
