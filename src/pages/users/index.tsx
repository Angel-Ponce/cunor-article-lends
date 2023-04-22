import { NextPage } from "next";
import AppLayout from "../../components/templates/AppLayout";
import { Button, Pagination, Table } from "antd";
import { useQuery } from "@apollo/client";
import { usersQuery } from "./gql";
import { useEffect, useState } from "react";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import Delete from "./Delete";
import { useAtom } from "jotai";
import { user as userAtom } from "../../stores/auth";
import Form from "./Form";

const Users: NextPage = () => {
  const { data, loading, refetch } = useQuery(usersQuery, {
    variables: {
      page: 1,
    },
    fetchPolicy: "cache-and-network",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [user] = useAtom(userAtom);

  useEffect(() => {
    refetch({ page: currentPage });
  }, [currentPage, refetch]);

  return (
    <AppLayout>
      <div className="flex justify-end mb-5">
        <Button type="primary" icon={<PlusOutlined />}>
          Nuevo
        </Button>
      </div>
      <Table
        pagination={false}
        columns={[
          {
            title: "Nombre",
            render: (_, { name, lastname }) => (
              <>
                {name} {lastname}
              </>
            ),
            key: "fullname",
          },
          {
            title: "Teléfono",
            dataIndex: "phone",
            key: "phone",
          },
          {
            title: "Nombre de usuario",
            dataIndex: "username",
            key: "username",
          },
          {
            title: "Rol",
            render: (_, { role }) => (
              <>{role == "admin" ? "Administrador" : "Usuario"}</>
            ),
            key: "role",
          },
          {
            key: "actions",
            render: (_, u) => (
              <div className="flex items-center gap-2 text-lg">
                <Form
                  editing
                  user={u}
                  onOk={() => refetch({ page: currentPage })}
                >
                  <Button
                    className="rounded-full"
                    icon={<EditTwoTone twoToneColor="orange" />}
                  />
                </Form>
                {u.id != user?.id && (
                  <Delete user={u} onOk={() => refetch({ page: currentPage })}>
                    <Button
                      className="rounded-full"
                      icon={<DeleteTwoTone twoToneColor="red" />}
                    />
                  </Delete>
                )}
              </div>
            ),
          },
        ]}
        loading={loading}
        dataSource={data?.users.rows}
      />
      <div className="flex justify-end">
        <Pagination total={0} pageSize={20} onChange={setCurrentPage} />
      </div>
    </AppLayout>
  );
};

export default Users;
