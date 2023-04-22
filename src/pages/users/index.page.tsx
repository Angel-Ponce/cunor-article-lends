import { NextPage } from "next";
import AppLayout from "../../components/templates/AppLayout";
import { Avatar, Button, Pagination, Result, Table } from "antd";
import { useQuery } from "@apollo/client";
import { usersQuery } from "./gql";
import { useEffect, useState } from "react";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import Delete from "./Delete";
import { useAtom } from "jotai";
import { user as userAtom } from "../../stores/auth";
import Form from "./Form";
import { useRouter } from "next/router";

const Users: NextPage = () => {
  const { data, loading, refetch } = useQuery(usersQuery, {
    variables: {
      page: 1,
    },
    fetchPolicy: "cache-and-network",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [user] = useAtom(userAtom);
  const router = useRouter();

  useEffect(() => {
    refetch({ page: currentPage });
  }, [currentPage, refetch]);

  return (
    <AppLayout>
      {user?.role != "admin" ? (
        <Result
          status="403"
          title="403"
          subTitle="Lo sentimos, no estas autorizado para visualizar esta página."
          extra={
            <Button type="primary" onClick={() => router.push("/")}>
              Volver a inicio
            </Button>
          }
        />
      ) : (
        <>
          <div className="flex justify-end mb-5">
            <Form onOk={() => refetch({ page: currentPage })}>
              <Button type="primary" icon={<PlusOutlined />}>
                Nuevo
              </Button>
            </Form>
          </div>
          <Table
            scroll={{ y: 500 }}
            pagination={false}
            columns={[
              {
                title: "Nombre",
                render: (_, { name, lastname }) => (
                  <div className="flex items-center gap-2">
                    <Avatar
                      src={`https://api.dicebear.com/6.x/identicon/svg?seed=${name} ${lastname}`}
                      alt={name}
                      size={36}
                    />
                    <p>
                      {name} {lastname}
                    </p>
                  </div>
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
                      <Delete
                        user={u}
                        onOk={() => refetch({ page: currentPage })}
                      >
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
            <Pagination
              total={data?.users.length || 0}
              pageSize={20}
              onChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </AppLayout>
  );
};

export default Users;
