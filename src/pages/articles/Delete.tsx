import { InfoCircleTwoTone } from "@ant-design/icons";
import { Popconfirm, notification } from "antd";
import { FC, ReactNode } from "react";
import { ArticlesQuery } from "../../graphql/generated/client/graphql";
import { useMutation } from "@apollo/client";
import { deleteArticleMutation } from "./gql";

const Delete: FC<{
  children: ReactNode;
  article: ArticlesQuery["articles"]["rows"][number];
  onOk: () => void;
}> = ({ children, article, onOk }) => {
  const [mutation] = useMutation(deleteArticleMutation, {
    variables: {
      deleteArticleId: article.id,
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
      message: "Artículo eliminado",
      description: `El artículo ${article.name} ha sido eliminado con éxito.`,
    });
  };

  return (
    <Popconfirm
      title="Eliminar artículo"
      description="¿Está seguro de eliminar este artículo?"
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
