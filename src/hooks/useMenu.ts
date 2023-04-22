import { useRouter } from "next/router";
import type { MenuProps } from "antd";

const useMenu = () => {
  const router = useRouter();

  type MenuItem = Required<MenuProps>["items"][number];

  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    disabled = false,
    children?: MenuItem[]
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      onClick: () => {
        router.push(key.toString());
      },
      disabled,
    } as MenuItem;
  };

  return getItem;
};

export { useMenu };
