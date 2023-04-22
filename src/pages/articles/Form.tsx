import { FC, ReactNode, useState } from "react";
import {
  ArticlesQuery,
  CreateArticleMutationVariables,
  CreatePhisicalStateMutationVariables,
} from "../../graphql/generated/client/graphql";
import { Drawer, Form as AntdForm, Input, Button, notification } from "antd";
import { useMutation } from "@apollo/client";
import { createArticleMutation, updateArticleMutation } from "./gql";

const Form: FC<{
  children: ReactNode;
  editing?: boolean;
  article?: ArticlesQuery["articles"]["rows"][number];
  onOk: () => void;
}> = ({ children, editing = false, article, onOk }) => {
  const [open, setOpen] = useState(false);
  const [createArticle, { loading: creating }] = useMutation(
    createArticleMutation
  );
  const [updateArticle, { loading: updating }] = useMutation(
    updateArticleMutation
  );

  const handleSubmit = async (values: CreateArticleMutationVariables) => {
    if (editing) {
      const { errors } = await updateArticle({
        variables: {
          updateArticleId: article?.id || 0,
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
        message: "Artículo actualizado",
        description: `El artículo ${values.name} ha sido actualizado con éxito.`,
      });

      return;
    }

    const { errors } = await createArticle({
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
      message: "Artículo creado",
      description: `El artículo ${values.name} ha sido creado con éxito.`,
    });
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={`${editing ? "Editar" : "Crear"} artículo`}
        destroyOnClose
      >
        <AntdForm
          layout="vertical"
          initialValues={article}
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
