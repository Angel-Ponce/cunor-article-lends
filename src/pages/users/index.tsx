import { NextPage } from "next";
import AppLayout from "../../components/templates/AppLayout";
import { Button } from "antd";

const Users: NextPage = () => {
  return (
    <AppLayout>
      <div className="flex justify-end">
        <Button type="primary">Nuevo</Button>
      </div>
    </AppLayout>
  );
};

export default Users;
