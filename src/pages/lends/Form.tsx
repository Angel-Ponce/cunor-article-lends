import { useQuery } from "@apollo/client";
import {
  Drawer,
  Form as AntdForm,
  Button,
  Select,
  Avatar,
  DatePicker,
  TimePicker,
} from "antd";
import { FC, ReactNode, useState } from "react";
import { allProfessorsQuery } from "../professors/gql";

const Form: FC<{ children: ReactNode; onOk: () => void }> = ({
  children,
  onOk,
}) => {
  const [open, setOpen] = useState(false);
  const { data: professors, loading } = useQuery(allProfessorsQuery);

  const handleSubmit = async (values: any) => {
    console.log(values);
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
            dueDate: {
              date: undefined,
              hour: undefined,
            },
            articles: [],
          }}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <AntdForm.Item name="professorId" label="Profesor">
            <Select loading={loading}>
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
          <div className="flex gap-2 items-center">
            <AntdForm.Item
              name={["dueDate", "date"]}
              label="Fecha de devolución"
            >
              <DatePicker placeholder="Selecciona fecha"></DatePicker>
            </AntdForm.Item>
            <AntdForm.Item
              name={["dueDate", "hour"]}
              label="Hora de devolución"
            >
              <TimePicker placeholder="Selecciona hora"></TimePicker>
            </AntdForm.Item>
          </div>
          <AntdForm.Item className="flex justify-end">
            <Button htmlType="submit" type="primary" loading={false}>
              Guardar
            </Button>
          </AntdForm.Item>
        </AntdForm>
      </Drawer>
    </>
  );
};

export default Form;
