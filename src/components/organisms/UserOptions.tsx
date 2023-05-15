import { Avatar, Button, Divider, Typography } from "antd";
import { useAtom } from "jotai";
import { user as userAtom } from "../../stores/auth";
import { useLogout } from "../../hooks/useLogout";
import ChangePassword from "./ChangePassword";

const UserOptions = () => {
  const [user] = useAtom(userAtom);
  const logout = useLogout();

  return (
    <div className="w-[240px] p-6 flex flex-col items-center gap-4">
      <Avatar
        size={60}
        src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.name} ${user?.lastname}`}
      />
      <div className="flex flex-col items-center">
        <Typography.Title level={4} className="!my-0 text-center">
          {user?.name} {user?.lastname}
        </Typography.Title>
        <Typography.Text className="!my-0 text-center" type="secondary">
          {user?.role == "admin" ? "Administrador" : "Usuario"}
        </Typography.Text>
      </div>
      <div className="w-full flex flex-col items-center gap-2">
        <Divider />
        <ChangePassword>
          <Button className="min-w-[160px]">Cambiar contraseña</Button>
        </ChangePassword>
        <Button className="min-w-[160px]" onClick={logout}>
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
};

export default UserOptions;
