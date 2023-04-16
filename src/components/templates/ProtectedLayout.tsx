import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useState } from "react";
import store from "store2";

const ProtectedLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();

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
  }, [router]);

  return <>{children}</>;
};

export default ProtectedLayout;
