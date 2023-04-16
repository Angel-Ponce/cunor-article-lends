import { useRouter } from "next/router";
import store from "store2";
import { useAtom } from "jotai";
import { user } from "../stores/auth";

const useLogout = () => {
  const router = useRouter();
  const [, setUser] = useAtom(user);

  const logout = () => {
    store.remove("user");
    store.remove("token");
    setUser(null);
    router.push("/login");
  };

  return logout;
};

export { useLogout };
