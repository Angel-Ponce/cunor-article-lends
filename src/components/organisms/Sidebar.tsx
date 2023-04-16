import Image from "next/image";
import { FC } from "react";
import UsacLogo from "../../../public/usac-logo.png";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import {
  AiOutlineDatabase,
  AiOutlineCodeSandbox,
  AiOutlineIdcard,
  AiOutlineFund,
  AiOutlineUser,
} from "react-icons/ai";

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
};

const items: MenuItem[] = [
  getItem("Prestamos", "item-lends", <AiOutlineDatabase />),
  getItem("Artículos", "item-articles", <AiOutlineCodeSandbox />),
  getItem("Profesores", "item-professors", <AiOutlineIdcard />),
  getItem("Estados físicos", "item-phisical-states", <AiOutlineFund />),
  getItem("Usuarios", "item-users", <AiOutlineUser />),
];

const Sidebar: FC<{ collapsed: boolean }> = ({ collapsed }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <Image
        alt="usac-logo"
        src={UsacLogo}
        className={`${
          collapsed ? "w-12" : "w-24"
        } h-auto transition-[width] mb-14`}
      />
      <Menu
        theme="dark"
        defaultSelectedKeys={["item-lends"]}
        items={items}
        className="w-full max-w-full"
      />
    </div>
  );
};

export default Sidebar;
