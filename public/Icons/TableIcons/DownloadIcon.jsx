function DownloadIcon() {
  return (
    <svg
      className={`action-icon ${disabled && "disable"}`}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.75 14C1.26875 14 0.856917 13.8288 0.5145 13.4864C0.1715 13.1434 0 12.7312 0 12.25V9.625H1.75V12.25H12.25V9.625H14V12.25C14 12.7312 13.8288 13.1434 13.4864 13.4864C13.1434 13.8288 12.7312 14 12.25 14H1.75ZM7 10.5L2.625 6.125L3.85 4.85625L6.125 7.13125V0H7.875V7.13125L10.15 4.85625L11.375 6.125L7 10.5Z"
        fill="#04B0A8"
      />
    </svg>
  );
}

export default DownloadIcon;
