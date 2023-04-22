import { FC, ReactNode, useState } from "react";
import {
  CreateProfessorMutationVariables,
  ProfessorsQuery,
} from "../../graphql/generated/client/graphql";
import { Drawer, Form as AntdForm, Input, Button, notification } from "antd";
import { useMutation } from "@apollo/client";
import { createProfessorMutation, updateProfessorMutation } from "./gql";

const Form: FC<{
  children: ReactNode;
  editing?: boolean;
  professor?: ProfessorsQuery["professors"]["rows"][number];
  onOk: () => void;
}> = ({ children, editing = false, professor, onOk }) => {
  const [open, setOpen] = useState(false);
  const [createPhisicalState, { loading: creating }] = useMutation(
    createProfessorMutation
  );
  const [updatePhisicalState, { loading: updating }] = useMutation(
    updateProfessorMutation
  );

  const handleSubmit = async (values: CreateProfessorMutationVariables) => {
    if (editing) {
      const { errors } = await updatePhisicalState({
        variables: {
          updateProfessorId: professor?.id || 0,
          ...values,
        },
      });

      if (errors) {
        notification.error({
          message: "Error!",
          description:
            "Parece que algo ha salido mal, intenta nuevamente más tarde",
        });

        return;
      }

      onOk();
      setOpen(false);
      notification.success({
        message: "Profesor actualizado",
        description: `El profesor ${values.name} ha sido actualizado con éxito.`,
      });

      return;
    }

    const { errors } = await createPhisicalState({
      variables: {
        ...values,
      },
    });

    if (errors) {
      notification.error({
        message: "Error!",
        description:
          "Parece que algo ha salido mal, intenta nuevamente más tarde",
      });

      return;
    }

    onOk();
    setOpen(false);
    notification.success({
      message: "Profesor creado",
      description: `El profesor ${values.name} ha sido creado con éxito.`,
    });
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={`${editing ? "Editar" : "Crear"} estado físico`}
        destroyOnClose
      >
        <AntdForm
          layout="vertical"
          initialValues={professor}
          onFinish={handleSubmit}
        >
          <AntdForm.Item
            name="name"
            label="Nombre"
            rules={[{ required: true, message: "Este campo es requerido" }]}
          >
            <Input></Input>
          </AntdForm.Item>
          <AntdForm.Item
            name="lastname"
            label="Apellido"
            rules={[{ required: true, message: "Este campo es requerido" }]}
          >
            <Input></Input>
          </AntdForm.Item>
          <AntdForm.Item
            name="personalRegister"
            label="Registro personal"
            rules={[{ required: true, message: "Este campo es requerido" }]}
          >
            <Input></Input>
          </AntdForm.Item>
          <AntdForm.Item name="phone" label="Teléfono">
            <Input></Input>
          </AntdForm.Item>
          <AntdForm.Item className="flex justify-end">
            <Button
              htmlType="submit"
              type="primary"
              loading={creating || updating}
            >
              Guardar
            </Button>
          </AntdForm.Item>
        </AntdForm>
      </Drawer>
    </>
  );
};

export default Form;
