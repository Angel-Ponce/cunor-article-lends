import { FC, ReactNode, useEffect } from "react";
import {
  DatabaseOutlined,
  CodeSandboxOutlined,
  IdcardOutlined,
  FundOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { app } from "../../stores/app";
import { useRouter } from "next/router";
import { useAtom } from "jotai";

export const routes: Record<
  string,
  { title: string; icon: ReactNode; show: boolean }
> = {
  "/": {
    title: "Prestamos",
    icon: <DatabaseOutlined />,
    show: true,
  },
  "/articles": {
    title: "Artículos",
    icon: <CodeSandboxOutlined />,
    show: true,
  },
  "/professors": {
    title: "Profesores",
    icon: <IdcardOutlined />,
    show: true,
  },
  "/phisical-states": {
    title: "Estados físicos",
    icon: <FundOutlined />,
    show: true,
  },
  "/users": {
    title: "Usuarios",
    icon: <UserOutlined />,
    show: true,
  },
};

const RoutesLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [, setApp] = useAtom(app);

  useEffect(() => {
    if (router.asPath in routes) {
      setApp({
        title: routes[router.asPath].title,
        icon: routes[router.asPath].icon,
      });

      return;
    }

    setApp({});
  }, [router, setApp]);

  return <>{children}</>;
};

export default RoutesLayout;
