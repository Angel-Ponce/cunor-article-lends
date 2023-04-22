import { InfoCircleTwoTone } from "@ant-design/icons";
import { Popconfirm, notification } from "antd";
import { FC, ReactNode } from "react";
import { ProfessorsQuery } from "../../graphql/generated/client/graphql";
import { useMutation } from "@apollo/client";
import { deleteProfessorMutation } from "./gql";

const Delete: FC<{
  children: ReactNode;
  professor: ProfessorsQuery["professors"]["rows"][number];
  onOk: () => void;
}> = ({ children, professor, onOk }) => {
  const [mutation] = useMutation(deleteProfessorMutation, {
    variables: {
      deleteProfessorId: professor.id,
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
      message: "Profesor eliminado",
      description: `El profesor  ${professor.name} ha sido eliminado con éxito.`,
    });
  };

  return (
    <Popconfirm
      title="Eliminar profesor"
      description="¿Está seguro de eliminar este profesor?"
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
