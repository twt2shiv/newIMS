"use client";
import getAsyncSelectOptions from "public/staticData/getAsyncSelectOptions";
import { Select, Spin } from "antd";
import { useState } from "react";

export default function MyAsyncSelect({
  value,
  onChange,
  size,
  placeholder,
  labelInValue,
  mode,
  disabled,
  url,
}) {
  const [optionsState, setOptionsState] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadOptions = async (value) => {
    if (value.length >= 3) {
      setLoading(true);
      const arr = await getAsyncSelectOptions(url, value);
      setLoading(false);
      setOptionsState(arr);
    }
  };
  return (
    <Select
      onBlur={() => setOptionsState([])}
      disabled={disabled}
      showSearch
      value={value == "" || value == [] ? null : value}
      placeholder={placeholder}
      mode={mode}
      showArrow={true}
      size={size ? size : "default"}
      style={{
        width: "100%",
        cursor: "pointer",
      }}
      filterOption={false}
      onSearch={(value) => value.length > 2 && loadOptions(value)}
      onChange={onChange}
      notFoundContent={loading ? <Spin size="small" /> : null}
      labelInValue={labelInValue}
      options={(optionsState || []).map((d) => ({
        value: d.value,
        label: d.text,
      }))}
    />
  );
}
