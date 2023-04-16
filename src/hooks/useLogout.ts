import { useRouter } from "next/router";
import store from "store2";

const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    store.remove("user");
    store.remove("token");
    router.push("/login");
  };

  return logout;
};

export { useLogout };
