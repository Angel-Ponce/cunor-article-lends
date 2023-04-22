import { FC, ReactNode, useState } from "react";
import { UsersQuery } from "../../graphql/generated/client/graphql";
import { Drawer } from "antd";

const Form: FC<{
  children: ReactNode;
  editing: boolean;
  user: UsersQuery["users"]["rows"][number];
  onOk: () => void;
}> = ({ children, editing, user, onOk }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={`${editing ? "Editar" : "Crear"} usuario`}
      >
        form go here
      </Drawer>
    </>
  );
};

export default Form;
