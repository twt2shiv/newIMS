"use client";
import Icon from "@ant-design/icons";

export default function AddRow() {
  let icon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="white" />
      <path
        d="M10.8571 20V13.1429H4V10.8571H10.8571V4H13.1429V10.8571H20V13.1429H13.1429V20H10.8571Z"
        fill="#04B0A8"
      />
      <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" stroke="#04B0A8" />
    </svg>
  );

  return <Icon component={() => icon()} />;
}
