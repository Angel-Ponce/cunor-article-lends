import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useState } from "react";
import store from "store2";
import { useAtom } from "jotai";
import { user } from "../../stores/auth";

const ProtectedLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [, setUser] = useAtom(user);

  useEffect(() => {
    if (!router.isReady) return;

    const user = store("user");

    if (router.asPath == "/login") {
      if (user) {
        router.push("/");
      }
      return;
    }

    if (!user) {
      router.push("/login");
    }

    setUser(user || null);
  }, [router, setUser]);

  return <>{children}</>;
};

export default ProtectedLayout;
