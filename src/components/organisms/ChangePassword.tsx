import { Button, Form, Input, Modal, notification } from "antd";
import { FC, ReactNode, useState } from "react";
import { graphql } from "../../graphql/generated/client";
import { useMutation } from "@apollo/client";
import { UpdatePasswordMutationVariables } from "../../graphql/generated/client/graphql";
import { useAtom } from "jotai";
import { user as userAtom } from "../../stores/auth";

const updatePasswordMutation = graphql(`
  mutation updatePassword(
    $userId: Int!
    $oldPassword: String!
    $newPassword: String!
  ) {
    updatePassword(
      userId: $userId
      oldPassword: $oldPassword
      newPassword: $newPassword
    )
  }
`);

const ChangePassword: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [mutation, { loading }] = useMutation(updatePasswordMutation);
  const [user] = useAtom(userAtom);

  const handleChange = async (values: UpdatePasswordMutationVariables) => {
    const { errors } = await mutation({
      variables: {
        userId: user?.id || 0,
        newPassword: values.newPassword,
        oldPassword: values.oldPassword,
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

    setOpen(false);
    notification.success({
      message: "Contraseña actualizada",
      description: `La contraseña se ha actualizado con éxito.`,
    });
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Modal
        open={open}
        title="Cambiar contraseña"
        onCancel={() => setOpen(false)}
        footer={false}
        destroyOnClose
      >
        <Form
          layout="vertical"
          initialValues={{ oldPassword: "", newPassword: "" }}
          onFinish={handleChange}
        >
          <Form.Item
            label="Contraseña antigua"
            name="oldPassword"
            rules={[{ required: true, message: "Este campo es obligatorio" }]}
          >
            <Input.Password></Input.Password>
          </Form.Item>
          <Form.Item
            label="Contraseña nueva"
            name="newPassword"
            rules={[{ required: true, message: "Este campo es obligatorio" }]}
          >
            <Input.Password></Input.Password>
          </Form.Item>
          <div className="flex justify-end items-center gap-2">
            <Form.Item>
              <Button onClick={() => setOpen(false)}>Cancelar</Button>
            </Form.Item>
            <Form.Item>
              <Button loading={loading} type="primary" htmlType="submit">
                Guardar
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ChangePassword;
