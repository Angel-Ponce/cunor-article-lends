import { FC, ReactNode, useEffect } from "react";
import {
  AiOutlineDatabase,
  AiOutlineCodeSandbox,
  AiOutlineIdcard,
  AiOutlineFund,
  AiOutlineUser,
} from "react-icons/ai";
import { app } from "../../stores/app";
import { useRouter } from "next/router";
import { useAtom } from "jotai";

export const routes: Record<
  string,
  { title: string; icon: ReactNode; show: boolean }
> = {
  "/": {
    title: "Prestamos",
    icon: <AiOutlineDatabase />,
    show: true,
  },
  "/articles": {
    title: "Artículos",
    icon: <AiOutlineCodeSandbox />,
    show: true,
  },
  "/professors": {
    title: "Profesores",
    icon: <AiOutlineIdcard />,
    show: true,
  },
  "/phisical-states": {
    title: "Estados físicos",
    icon: <AiOutlineFund />,
    show: true,
  },
  "/users": {
    title: "Usuarios",
    icon: <AiOutlineUser />,
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
