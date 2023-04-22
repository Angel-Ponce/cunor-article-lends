import { FC, ReactNode, useState } from "react";
import { LendsQuery } from "../../graphql/generated/client/graphql";
import { Button, Form, Input, Modal, Select, notification } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { allPhisicalStatesQuery } from "../phisical-states/gql";
import { completeLendMutation } from "./gql";

const Complete: FC<{
  children: ReactNode;
  lend: LendsQuery["lends"]["rows"][number];
  onOk: () => void;
}> = ({ children, lend, onOk }) => {
  const [open, setOpen] = useState(false);
  const { data: phisicalStates, loading: loadingPhisicalStates } = useQuery(
    allPhisicalStatesQuery
  );
  const [mutation, { loading }] = useMutation(completeLendMutation);

  const onComplete = async (values: {
    articles: { article: number; phisicalStateId: number }[];
  }) => {
    const { errors } = await mutation({
      variables: {
        completeLendId: lend.id,
        articlesStates: values.articles.map((a) => ({
          articleId: a.article,
          phisicalStateId: a.phisicalStateId,
        })),
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
      message: "Prestamo completado",
      description: `El prestamo se ha completado con éxito.`,
    });
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Modal
        open={open}
        title="Marcar prestamo como completo"
        destroyOnClose
        onCancel={() => setOpen(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={onComplete}
          initialValues={{
            articles: lend.articles.map((a) => ({
              article: a.article.id,
              phisicalStateId: undefined,
            })),
          }}
        >
          <Form.List name="articles">
            {(fields) => (
              <>
                {fields.map((f) => (
                  <div key={f.key} className="flex items-center gap-2">
                    <Form.Item
                      label="Artículo"
                      name={[f.name, "article"]}
                      className="flex-1"
                      rules={[
                        {
                          required: true,
                          message: "Este campo es obligatorio.",
                        },
                      ]}
                    >
                      <Select
                        options={lend.articles.map((a) => ({
                          value: a.article.id,
                          label: a.article.name,
                        }))}
                        bordered={false}
                        open={false}
                      />
                    </Form.Item>
                    <Form.Item
                      className="flex-1"
                      name={[f.name, "phisicalStateId"]}
                      label="Estado físico de devolución"
                      rules={[
                        {
                          required: true,
                          message: "Este campo es obligatorio.",
                        },
                      ]}
                    >
                      <Select
                        loading={loadingPhisicalStates}
                        options={phisicalStates?.phisicalStates.rows}
                      />
                    </Form.Item>
                  </div>
                ))}
              </>
            )}
          </Form.List>
          <div className="flex items-center justify-end gap-2">
            <Form.Item>
              <Button onClick={() => setOpen(false)}>Cancelar</Button>
            </Form.Item>
            <Form.Item>
              <Button loading={loading} type="primary" htmlType="submit">
                Completar
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Complete;
