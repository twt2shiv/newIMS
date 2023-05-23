"use client";

import {
  FileOutlined,
  TeamOutlined,
  ProfileOutlined,
  CalculatorOutlined,
  MinusOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Icon from "@ant-design/icons";
import FavroriteIcon from "public/Icons/SideBar/FavroriteIcon";
import FinanceIcon from "public/Icons/SideBar/FinanceIcon";
import DashBoardIcon from "public/Icons/SideBar/DashBoardIcon";
import MaterialManagenent from "public/Icons/SideBar/MaterialManagenent.";
import ProductionIcon from "public/Icons/SideBar/ProductionIcon";
import CPMIcon from "public/Icons/SideBar/CPMIcon";
import PaytmIcon from "public/Icons/SideBar/PaytmIcon";
import { MdOutlineSpaceDashboard, MdCurrencyRupee } from "react-icons/md";
import { SiPaytm } from "react-icons/si";
import { TfiSharethis } from "react-icons/tfi";
import Link from "next/link";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  // getItem("Favorites", "1", <FavroriteIcon />),
  getItem("Favorites", "1", <StarOutlined />),
  getItem("Finance", "2", <MdCurrencyRupee />),
  getItem("Dash Board", "sub1", <MdOutlineSpaceDashboard />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Material Mgmt", "/material-mangement", <ProfileOutlined />, [
    getItem("Master", "/material-management/master", <MinusOutlined />, [
      getItem(
        <Link href="/material-management/master/uom">UOM</Link>,
        "/material-management/master/uom"
      ),
      getItem(
        <Link href="/material-management/master/material-services/material">
          Materials/Services
        </Link>,
        "/material-management/master/material-services/material"
      ),
      getItem(
        <Link href="/material-management/master/products">
          Products (FG / SFG)
        </Link>,
        "/material-management/master/products"
      ),
      getItem(
        <Link href="/material-management/master/locations">Locations</Link>,
        "/material-management/master/locations"
      ),
      getItem(
        <Link href="/material-management/master/groups">Groups</Link>,
        "/material-management/master/groups"
      ),
      getItem(
        <Link href="/material-management/master/address/billing">
          Master Addresses
        </Link>,
        "/material-management/master/address/billing"
      ),
    ]),
    getItem(
      "Procurement",
      "/material-management/procurement",
      <MinusOutlined />,
      [
        getItem(
          <Link href="/material-management/procurement/create-po">
            Create PO
          </Link>,
          "/material-mangement/procurement/create-po",
          <MinusOutlined />
        ),
        getItem(
          <Link href="/material-management/procurement/pending-po">
            Pending PO
          </Link>,
          "/material-mangement/procurement/pending-po",
          <MinusOutlined />
        ),
        getItem(
          <Link href="/material-management/procurement/completed-po">
            Completed PO
          </Link>,
          "/material-mangement/procurement/completed-po",
          <MinusOutlined />
        ),
      ]
    ),
  ]),
  getItem("Production", "9", <TfiSharethis />),
  getItem("CPM Analysis", "10", <CalculatorOutlined />),
  getItem("Paytm Analysis", "11", <SiPaytm />),
];

// const items = [
//   {
//     label: "Item 1",
//     key: 0,
//     children: [
//       { label: "Sub Item 1", href: "/item-11", key: 1 },
//       { label: "Sub Item 2", href: "/item-12", key: 2 },
//     ],
//   },
//   {
//     label: "Item 2",
//     key: 3,
//     children: [
//       { label: "Sub Item 3", href: "/item-21", key: 4 },
//       { label: "Sub Item 4", href: "/item-22", key: 5 },
//     ],
//   },
// ];

export default items;
