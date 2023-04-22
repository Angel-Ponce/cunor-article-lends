import { InfoCircleTwoTone } from "@ant-design/icons";
import { Popconfirm, notification } from "antd";
import { FC, ReactNode } from "react";
import { PhisicalStatesQuery } from "../../graphql/generated/client/graphql";
import { useMutation } from "@apollo/client";
import { deletePhisicalStateMutation } from "./gql";

const Delete: FC<{
  children: ReactNode;
  phisicalState: PhisicalStatesQuery["phisicalStates"]["rows"][number];
  onOk: () => void;
}> = ({ children, phisicalState, onOk }) => {
  const [mutation] = useMutation(deletePhisicalStateMutation, {
    variables: {
      deletePhisicalStateId: phisicalState.id,
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
      message: "Estado físico eliminado",
      description: `El estado físico  ${phisicalState.name} ha sido eliminado con éxito.`,
    });
  };

  return (
    <Popconfirm
      title="Eliminar estado físico"
      description="¿Está seguro de eliminar este estado físico?"
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
