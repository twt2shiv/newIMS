"use client";
import { Button, Col, Input, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import DateRangePicker from "../DatePicker/DateRangePicker/DateRangePicker";
import MyAsyncSelect from "../Select/MyAsyncSelect/MyAsyncSelect";
import MySelect from "../Select/MySelect/MySelect";
import { CommonIcons } from "../TableActions/TableActions";
import setWiseOptions from "public/staticData/wiseOptions";

function TopSearchBar({ wiseOptions, getRows, downloadFunction, defaultWise }) {
  const [searchInput, setSearchInput] = useState("");
  const [wise, setWise] = useState(defaultWise ?? "");
  const wiseOptionsFinal = setWiseOptions(wiseOptions);

  useEffect(() => {
    if (wise === "po_wise") {
      setSearchInput("PO/22-23/");
    } else {
      setSearchInput("");
    }
  }, [wise]);
  return (
    <Row justify="space-between">
      <Col>
        <Space>
          <div style={{ width: 200 }}>
            <MySelect
              onChange={(value) => setWise(value)}
              value={wise}
              options={wiseOptionsFinal}
            />
          </div>
          <div style={{ width: 253 }}>
            {wise === "range_date_wise" && (
              <DateRangePicker setDateRange={setSearchInput} />
            )}
            {wise === "po_wise" && (
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            )}
            {wise === "vendor_wise" && (
              <MyAsyncSelect
                onChange={(value) => setSearchInput(value)}
                value={searchInput}
                url="http://localhost:3001/backend/vendorList"
              />
            )}
          </div>
          <Button type="primary" onClick={() => getRows(wise, searchInput)}>
            Search
          </Button>
        </Space>
      </Col>
      <Col>
        <Space>
          <CommonIcons
            onClick={() => downloadFunction(searchInput)}
            action="downloadButton"
          />
        </Space>
      </Col>
    </Row>
  );
}

export default TopSearchBar;
