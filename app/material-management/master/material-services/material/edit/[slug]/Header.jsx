"use client";
import { Button, Col, Row, Space, Typography } from "antd";

export default function Header({
  partCode,
  showCancelConfirm,
  showSubmitConfirm,
  showResetConfirm,
  loading,
}) {
  return (
    <Row justify="space-between">
      <Col>
        <Space align="center">
          <Typography.Title style={{ margin: 0 }} level={4}>
            Edit Material {">"}{" "}
          </Typography.Title>
          <Typography.Title level={4} style={{ margin: 0 }} type="secondary">
            {partCode}
          </Typography.Title>
        </Space>
      </Col>
      <Col>
        <Space>
          <Button type="text" onClick={showCancelConfirm}>
            Cancel
          </Button>
          <Button onClick={showResetConfirm}>Reset</Button>
          <Button loading={loading} onClick={showSubmitConfirm} type="primary">
            Save
          </Button>
        </Space>
      </Col>
    </Row>
  );
}
