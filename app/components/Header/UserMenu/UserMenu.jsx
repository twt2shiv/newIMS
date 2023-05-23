import { Avatar, Button, Dropdown, Space } from "antd";
import Link from "next/link";
import { DownOutlined } from "@ant-design/icons";
import React from "react";
import { setUser } from "/app/store";
import { useDispatch, useSelector } from "react-redux";

function UserMenu() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.imsData);
  const items = [
    {
      label: <Link href="/profile">Profile</Link>,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <div
          style={{ height: "100%", width: "100%" }}
          onClick={() => dispatch(setUser(null))}
        >
          Logout
        </div>
      ),
      key: "1",
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={["click"]}
    >
      {/* <Button type="text" onClick={(e) => e.preventDefault()}> */}
      <Space style={{ cursor: "pointer" }}>
        <Avatar
          style={{
            backgroundColor: "#f56a00",
            //   verticalAlign: "middle",
            fontSize: 12,
          }}
          size={35}
          gap={4}
        >
          {user?.username?.split(" ")[0][0]}
          {user?.username?.split(" ")[1][0]}
        </Avatar>
        <span style={{ fontWeight: 500 }}>{user?.username}</span>
        <DownOutlined />
      </Space>
      {/* </Button> */}
    </Dropdown>
  );
}

export default UserMenu;
