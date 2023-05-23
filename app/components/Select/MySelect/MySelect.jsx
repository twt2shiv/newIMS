"use client";
import React, { useEffect, useState } from "react";
import { Select, Spin } from "antd";
export default function MySelect({
  options,
  size,
  value,
  onChange,
  disabled,
  labelInValue,
  mode,
  placeholder,
  borderLess,
}) {
  return (
    <Select
      labelInValue={labelInValue}
      mode={mode}
      size={size ? size : "default"}
      placeholder={placeholder}
      disabled={disabled}
      allowClear={false}
      value={value}
      onChange={onChange}
      optionFilterProp="text"
      style={{
        width: "100%",
      }}
      bordered={borderLess ? false : true}
      fieldNames={{ label: "text" }}
      showSearch
      showArrow={true}
      filterOption={(input, option) =>
        (option?.text?.toString()?.toLowerCase() ?? "").includes(input)
      }
      options={options}
    />
  );
}
