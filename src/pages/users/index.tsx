import { NextPage } from "next";
import AppLayout from "../../components/templates/AppLayout";
import { Button, Pagination, Table } from "antd";
import { useQuery } from "@apollo/client";
import { usersQuery } from "./util";
import { useEffect, useState } from "react";

const Users: NextPage = () => {
  const { data, loading, refetch } = useQuery(usersQuery, {
    variables: {
      page: 1,
    },
    fetchPolicy: "cache-and-network",
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    refetch({ page: currentPage });
  }, [currentPage, refetch]);

  return (
    <AppLayout>
      <div className="flex justify-end mb-5">
        <Button type="primary">Nuevo</Button>
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
