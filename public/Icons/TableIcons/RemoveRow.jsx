"use client";
import Icon from "@ant-design/icons";

export default function RemoveRow() {
  let icon = () => (
    <svg
      className={`action-icon ${disabled && "disable"}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="white" />
      <path d="M4 13H20V11H4V13Z" fill="#FF0000" />
      <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" stroke="#FF0000" />
    </svg>
  );

  return <Icon component={() => icon()} />;
}
