function CrossIcon() {
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
        d="M1.96 14L7 8.96L12.04 14L14 12.04L8.96 7L14 1.96L12.04 0L7 5.04L1.96 0L0 1.96L5.04 7L0 12.04L1.96 14Z"
        fill="#04B0A8"
      />
    </svg>
  );
}

export default CrossIcon;
