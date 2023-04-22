import { FC, ReactNode, useState } from "react";
import { UsersQuery } from "../../graphql/generated/client/graphql";
import { Drawer, Form as AntdForm, Input, Select, Button } from "antd";

const Form: FC<{
  children: ReactNode;
  editing?: boolean;
  user?: UsersQuery["users"]["rows"][number];
  onOk: () => void;
}> = ({ children, editing = false, user, onOk }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {};

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={`${editing ? "Editar" : "Crear"} usuario`}
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
          <AntdForm.Item
            name="password"
            label="Contraseña"
            rules={[{ required: true, message: "Este campo es requerido" }]}
          >
            <Input type="password"></Input>
          </AntdForm.Item>
          <AntdForm.Item
            name="role"
            label="Rol"
            rules={[{ required: true, message: "Este campo es requerido" }]}
          >
            <Select
              options={[
                { value: "admin", label: "Administrador" },
                { value: "user", label: "Usuario" },
              ]}
            ></Select>
          </AntdForm.Item>
          <AntdForm.Item className="flex justify-end">
            <Button htmlType="submit" type="primary">
              Guardar
            </Button>
          </AntdForm.Item>
        </AntdForm>
      </Drawer>
    </>
  );
};

export default Form;
