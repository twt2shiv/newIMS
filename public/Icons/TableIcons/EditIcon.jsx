import Icon from "@ant-design/icons/lib/components/Icon";
import React from "react";

function EditIcon({ disabled }) {
  let icon = () => (
    <svg
      className={`action-icon ${disabled && "disable"}`}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.36585 16C2.99024 16 2.66859 15.8663 2.40088 15.5989C2.13363 15.332 2 15.011 2 14.6358V5.08648C2 4.71133 2.13363 4.39006 2.40088 4.12268C2.66859 3.85575 2.99024 3.72229 3.36585 3.72229H9.46098L8.09512 5.08648H3.36585V14.6358H12.9268V9.89525L14.2927 8.53106V14.6358C14.2927 15.011 14.1591 15.332 13.8918 15.5989C13.6241 15.8663 13.3024 16 12.9268 16H3.36585ZM10.9976 4.11449L11.9707 5.06943L7.46341 9.57125V10.5432H8.41951L12.9439 6.02436L13.9171 6.97929L9.39268 11.4982C9.26748 11.6232 9.12247 11.7228 8.95766 11.7969C8.79239 11.8706 8.6187 11.9074 8.43659 11.9074H6.78049C6.58699 11.9074 6.42491 11.8422 6.29424 11.7117C6.16312 11.5807 6.09756 11.4186 6.09756 11.2253V9.57125C6.09756 9.38936 6.13171 9.21588 6.2 9.05082C6.26829 8.8862 6.36504 8.74137 6.49024 8.61632L10.9976 4.11449ZM13.9171 6.97929L10.9976 4.11449L12.7049 2.40926C12.978 2.13642 13.3054 2 13.6869 2C14.068 2 14.3894 2.13642 14.6512 2.40926L15.6073 3.38124C15.8691 3.64271 16 3.96102 16 4.33618C16 4.71133 15.8691 5.02964 15.6073 5.29111L13.9171 6.97929Z"
        fill="#04B0A8"
      />
    </svg>
  );
  return <Icon component={() => icon()} />;
}

export default EditIcon;