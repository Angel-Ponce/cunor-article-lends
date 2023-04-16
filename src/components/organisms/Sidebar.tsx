import Image from "next/image";
import { FC } from "react";
import UsacLogo from "../../../public/usac-logo.png";
import { Menu } from "antd";
import {
  AiOutlineDatabase,
  AiOutlineCodeSandbox,
  AiOutlineIdcard,
  AiOutlineFund,
  AiOutlineUser,
} from "react-icons/ai";
import { useMenu } from "../../hooks/useMenu";

const Sidebar: FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const getItem = useMenu();

  const items = [
    getItem("Prestamos", "/", <AiOutlineDatabase />),
    getItem("Artículos", "/articles", <AiOutlineCodeSandbox />),
    getItem("Profesores", "/professors", <AiOutlineIdcard />),
    getItem("Estados físicos", "/phisical-states", <AiOutlineFund />),
    getItem("Usuarios", "/users", <AiOutlineUser />),
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <Image
        alt="usac-logo"
        src={UsacLogo}
        className={`${
          collapsed ? "w-12" : "w-24"
        } h-auto transition-[width] mb-14`}
      />
      <Menu theme="dark" items={items} className="w-full max-w-full" />
    </div>
  );
};

export default Sidebar;
