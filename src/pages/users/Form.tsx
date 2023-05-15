import { FC, ReactNode, useState } from "react";
import {
  CreateUserMutationVariables,
  UsersQuery,
} from "../../graphql/generated/client/graphql";
import {
  Drawer,
  Form as AntdForm,
  Input,
  Select,
  Button,
  notification,
} from "antd";
import { useMutation } from "@apollo/client";
import { createUserMutation, updateUserMutation } from "./gql";

const Form: FC<{
  children: ReactNode;
  editing?: boolean;
  user?: UsersQuery["users"]["rows"][number];
  onOk: () => void;
}> = ({ children, editing = false, user, onOk }) => {
  const [open, setOpen] = useState(false);
  const [createUser, { loading: creating }] = useMutation(createUserMutation);
  const [updateUser, { loading: updating }] = useMutation(updateUserMutation);

  const handleSubmit = async (values: CreateUserMutationVariables) => {
    if (editing) {
      const { errors } = await updateUser({
        variables: {
          updateUserId: user?.id || 0,
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
        message: "Usuario actualizado",
        description: `El usuario ${values.name} ${values.lastname} ha sido actualizado con éxito.`,
      });

      return;
    }

    const { errors } = await createUser({
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
      message: "Usuario creado",
      description: `El usuario ${values.name} ${values.lastname} ha sido creado con éxito.`,
    });
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={`${editing ? "Editar" : "Crear"} usuario`}
        destroyOnClose
      >
        <AntdForm
          layout="vertical"
          initialValues={user}
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
            name="username"
            label="Nombre de usuario"
            rules={[{ required: true, message: "Este campo es requerido" }]}
          >
            <Input></Input>
          </AntdForm.Item>
          {!editing && (
            <AntdForm.Item
              name="password"
              label="Contraseña"
              rules={[{ required: true, message: "Este campo es requerido" }]}
            >
              <Input.Password></Input.Password>
            </AntdForm.Item>
          )}
          <AntdForm.Item
            name="role"
            label="Rol"
            rules={[{ required: true, message: "Este campo es requerido" }]}
          >
            <Select
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { value: "admin", label: "Administrador" },
                { value: "user", label: "Usuario" },
              ]}
            ></Select>
          </AntdForm.Item>
          <AntdForm.Item name="phone" label="Teléfono">
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
