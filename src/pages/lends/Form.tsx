import { Drawer, Form as AntdForm, Button, Select } from "antd";
import { FC, ReactNode, useState } from "react";

const Form: FC<{ children: ReactNode; onOk: () => void }> = ({
  children,
  onOk,
}) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {};

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
            articles: [],
          }}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <AntdForm.Item name="professorId" label="Profesor">
            <Select></Select>
          </AntdForm.Item>
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
