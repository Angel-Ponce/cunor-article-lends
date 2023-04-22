import { FC, ReactNode, useState } from "react";
import {
  CreatePhisicalStateMutationVariables,
  PhisicalStatesQuery,
} from "../../graphql/generated/client/graphql";
import { Drawer, Form as AntdForm, Input, Button, notification } from "antd";
import { useMutation } from "@apollo/client";
import {
  createPhisicalStateMutation,
  updatePhisicalStateMutation,
} from "./gql";

const Form: FC<{
  children: ReactNode;
  editing?: boolean;
  phisicalState?: PhisicalStatesQuery["phisicalStates"]["rows"][number];
  onOk: () => void;
}> = ({ children, editing = false, phisicalState, onOk }) => {
  const [open, setOpen] = useState(false);
  const [createPhisicalState, { loading: creating }] = useMutation(
    createPhisicalStateMutation
  );
  const [updatePhisicalState, { loading: updating }] = useMutation(
    updatePhisicalStateMutation
  );

  const handleSubmit = async (values: CreatePhisicalStateMutationVariables) => {
    if (editing) {
      const { errors } = await updatePhisicalState({
        variables: {
          updatePhisicalStateId: phisicalState?.id || 0,
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
        message: "Estado físico actualizado",
        description: `El estado físico ${values.name} ha sido actualizado con éxito.`,
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
      message: "Estado físico creado",
      description: `El estado físico ${values.name} ha sido creado con éxito.`,
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
          initialValues={phisicalState}
          onFinish={handleSubmit}
        >
          <AntdForm.Item
            name="name"
            label="Nombre"
            rules={[{ required: true, message: "Este campo es requerido" }]}
          >
            <Input></Input>
          </AntdForm.Item>
          <AntdForm.Item name="description" label="Descripción">
            <Input.TextArea></Input.TextArea>
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
