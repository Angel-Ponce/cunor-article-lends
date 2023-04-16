import Image from "next/image";
import { FC, useEffect, useState } from "react";
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
import { useRouter } from "next/router";

const Sidebar: FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const getItem = useMenu();
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const items = [
      "/",
      "/articles",
      "/professors",
      "/phisical-states",
      "/users",
    ];

    setSelected([]);

    if (router.asPath == "/") {
      setSelected(["/"]);
      return;
    }

    setSelected(items.filter((i) => i != "/" && router.asPath.includes(i)));
  }, [router]);

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
      <Menu
        theme="dark"
        selectedKeys={selected}
        items={items}
        className="w-full max-w-full"
      />
    </div>
  );
};

export default Sidebar;
