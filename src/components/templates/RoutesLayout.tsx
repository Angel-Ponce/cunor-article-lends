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

export const routes: Record<string, { title: string; icon: ReactNode }> = {
  "/": {
    title: "Prestamos",
    icon: <AiOutlineDatabase />,
  },
  "/articles": {
    title: "Artículos",
    icon: <AiOutlineCodeSandbox />,
  },
  "/professors": {
    title: "Profesores",
    icon: <AiOutlineIdcard />,
  },
  "/phisical-states": {
    title: "Estados físicos",
    icon: <AiOutlineFund />,
  },
  "/users": {
    title: "Usuarios",
    icon: <AiOutlineUser />,
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

    // setApp({});
  }, [router, setApp]);
  return <>{children}</>;
};

export default RoutesLayout;
