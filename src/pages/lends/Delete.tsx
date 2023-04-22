import { InfoCircleTwoTone } from "@ant-design/icons";
import { Popconfirm, notification } from "antd";
import { FC, ReactNode } from "react";
import { LendsQuery } from "../../graphql/generated/client/graphql";
import { useMutation } from "@apollo/client";
import { deleteLendMutation } from "./gql";

const Delete: FC<{
  children: ReactNode;
  lend: LendsQuery["lends"]["rows"][number];
  onOk: () => void;
}> = ({ children, lend, onOk }) => {
  const [mutation] = useMutation(deleteLendMutation, {
    variables: {
      deleteLendId: lend.id,
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

    onOk();
    notification.success({
      message: "Prestamo eliminado",
      description: `El prestamo ha sido eliminado con éxito.`,
    });
  };

  return (
    <Popconfirm
      title="Eliminar prestamo"
      description="¿Está seguro de eliminar este prestamo?"
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
