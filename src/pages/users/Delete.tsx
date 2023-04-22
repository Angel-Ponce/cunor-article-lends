import { InfoCircleTwoTone } from "@ant-design/icons";
import { Popconfirm, notification } from "antd";
import { FC, ReactNode } from "react";
import { UsersQuery } from "../../graphql/generated/client/graphql";
import { useMutation } from "@apollo/client";
import { deleteUserQuery } from "./gql";

const Delete: FC<{
  children: ReactNode;
  user: UsersQuery["users"]["rows"][number];
  onOk: () => void;
}> = ({ children, user, onOk }) => {
  const [mutation] = useMutation(deleteUserQuery, {
    variables: {
      deleteUserId: user.id,
    },
  });

  const handleDelete = async () => {
    const { errors } = await mutation();

    if (errors) {
      notification.error({
        message: "Error!",
        description:
          "Parece que algo ha salido mal, intenta nuevamente más tarde",
      });

      return;
    }

    notification.success({
      message: "Usuario eliminado",
      description: `El usuario ${user.name} ${user.lastname} ha sido eliminado con éxito.`,
    });
    onOk();
  };

  return (
    <Popconfirm
      title="Eliminar usuario"
      description="¿Está seguro de eliminar este usuario?"
      icon={<InfoCircleTwoTone twoToneColor="red" />}
      cancelText="Cancelar"
      okText="Eliminar"
      onConfirm={handleDelete}
    >
      {children}
    </Popconfirm>
  );
};

export default Delete;
