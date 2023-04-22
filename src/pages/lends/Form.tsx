import { useMutation, useQuery } from "@apollo/client";
import {
  Drawer,
  Form as AntdForm,
  Button,
  Select,
  Avatar,
  DatePicker,
  TimePicker,
  InputNumber,
  Tooltip,
  Divider,
  notification,
} from "antd";
import { FC, ReactNode, useState } from "react";
import { allProfessorsQuery } from "../professors/gql";
import { allArticlesQuery } from "../articles/gql";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { createLendMutation } from "./gql";

const Form: FC<{ children: ReactNode; onOk: () => void }> = ({
  children,
  onOk,
}) => {
  const [mutation, { loading }] = useMutation(createLendMutation);
  const [open, setOpen] = useState(false);
  const { data: professors, loading: professorsLoading } =
    useQuery(allProfessorsQuery);
  const { data: articles, loading: articlesLoading } =
    useQuery(allArticlesQuery);
  const [formArticles, setFormArticles] = useState<
    { article: number; count: number }[]
  >([]);

  const handleSubmit = async (values: {
    professorId: number;
    dueDate: Date;
    articles: { count: number; article: number }[];
  }) => {
    const { errors } = await mutation({
      variables: {
        professorId: values.professorId,
        dueDate: values.dueDate.toISOString(),
        articles: values.articles.map((a) => ({
          articleId: a.article,
          count: a.count,
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
      message: "Prestamo creado",
      description: `El prestamo se ha creado con éxito.`,
    });
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Crear prestamo"
        destroyOnClose
      >
        <AntdForm
          initialValues={{
            professorId: undefined,
            dueDate: undefined,
            articles: [{ count: undefined, article: undefined }],
          }}
          onFinish={handleSubmit}
          layout="vertical"
          onValuesChange={(_, values) => setFormArticles(values.articles)}
        >
          <Divider type="horizontal">Información del prestamo</Divider>
          <AntdForm.Item
            name="professorId"
            label="Profesor"
            rules={[{ required: true, message: "Este campo es obligatorio" }]}
          >
            <Select loading={professorsLoading}>
              {professors?.professors.rows.map((p) => (
                <Select.Option
                  key={p.id}
                  value={p.id}
                  label={`${p.name} ${p.lastname}`}
                >
                  <div className="flex items-center gap-2">
                    <Avatar
                      src={`https://api.dicebear.com/6.x/identicon/svg?seed=${p.name} ${p.lastname}`}
                      alt={p.name}
                      size={24}
                    />
                    <p>
                      {p.name} {p.lastname}
                    </p>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </AntdForm.Item>
          <AntdForm.Item
            name="dueDate"
            label="Fecha y hora de devolución"
            rules={[{ required: true, message: "Este campo es obligatorio" }]}
            className="flex-1"
          >
            <DatePicker
              className="w-full"
              placeholder="Selecciona fecha"
              showTime={true}
            />
          </AntdForm.Item>

          <Divider type="horizontal">Artículos para prestar</Divider>
          <AntdForm.List name="articles">
            {(fields, { add, remove }) => (
              <div className="w-full flex flex-col gap-2">
                {fields.map((field) => (
                  <div className="w-full flex items-end gap-2" key={field.key}>
                    <AntdForm.Item
                      name={[field.name, "article"]}
                      label="Artículo"
                      className="flex-1"
                      rules={[
                        {
                          required: true,
                          message: "Este campo es obligatorio.",
                        },
                      ]}
                    >
                      <Select
                        options={articles?.articles.rows.map((a) => ({
                          value: a.id,
                          label: a.name,
                          disabled:
                            !a.available ||
                            formArticles.some((fa) => fa.article == a.id),
                        }))}
                        loading={articlesLoading}
                      />
                    </AntdForm.Item>
                    <AntdForm.Item
                      name={[field.name, "count"]}
                      label="Cantidad"
                      className="flex-1"
                      rules={[
                        {
                          required: true,
                          message: "Este campo es obligatorio.",
                        },
                      ]}
                    >
                      <InputNumber className="w-full"></InputNumber>
                    </AntdForm.Item>
                    {fields.length > 1 && (
                      <AntdForm.Item className="w-fit">
                        <Tooltip title="Remover articulo">
                          <Button
                            icon={<MinusCircleOutlined />}
                            onClick={() => remove(field.name)}
                          />
                        </Tooltip>
                      </AntdForm.Item>
                    )}
                  </div>
                ))}
                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  onClick={() => add({ article: undefined, count: undefined })}
                >
                  Agregar otro producto
                </Button>
              </div>
            )}
          </AntdForm.List>
          <AntdForm.Item className="flex justify-end">
            <Button htmlType="submit" type="primary" loading={loading}>
              Guardar
            </Button>
          </AntdForm.Item>
        </AntdForm>
      </Drawer>
    </>
  );
};

export default Form;
