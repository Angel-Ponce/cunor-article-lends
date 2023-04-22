import Image from "next/image";
import { FC, useEffect, useState } from "react";
import UsacLogo from "../../../public/usac-logo.png";
import { Menu } from "antd";
import { useMenu } from "../../hooks/useMenu";
import { useRouter } from "next/router";
import { routes } from "../templates/RoutesLayout";
import { useAtom } from "jotai";
import { user as userAtom } from "../../stores/auth";

const Sidebar: FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const getItem = useMenu();
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [user] = useAtom(userAtom);

  const items = Object.keys(routes)
    .filter((k) => routes[k].show)
    .map((k) =>
      getItem(
        routes[k].title,
        k,
        routes[k].icon,
        k == "/users" && user?.role != "admin"
      )
    );

  useEffect(() => {
    const items = Object.keys(routes);

    setSelected([]);

    if (router.asPath == "/") {
      setSelected(["/"]);
      return;
    }

    setSelected(items.filter((i) => i != "/" && router.asPath.includes(i)));
  }, [router]);

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
