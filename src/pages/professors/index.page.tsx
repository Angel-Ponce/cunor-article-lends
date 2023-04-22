import { NextPage } from "next";
import AppLayout from "../../components/templates/AppLayout";
import { Button, Pagination, Table } from "antd";
import { useQuery } from "@apollo/client";
import { professorsQuery } from "./gql";
import { useEffect, useState } from "react";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import Delete from "./Delete";
import Form from "./Form";

const PhisicalStates: NextPage = () => {
  const { data, loading, refetch } = useQuery(professorsQuery, {
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
        <Form onOk={() => refetch({ page: currentPage })}>
          <Button type="primary" icon={<PlusOutlined />}>
            Nuevo
          </Button>
        </Form>
      </div>
      <Table
        pagination={false}
        columns={[
          {
            title: "Nombre",
            key: "fullname",
            render: (_, p) => (
              <>
                {p.name} {p.lastname}
              </>
            ),
          },
          {
            title: "Registro personal",
            dataIndex: "personalRegister",
            key: "personalRegister",
          },
          {
            title: "Teléfono",
            dataIndex: "phone",
            key: "phone",
          },
          {
            key: "actions",
            render: (_, p) => (
              <div className="flex items-center gap-2 text-lg">
                <Form
                  editing
                  professor={p}
                  onOk={() => refetch({ page: currentPage })}
                >
                  <Button
                    className="rounded-full"
                    icon={<EditTwoTone twoToneColor="orange" />}
                  />
                </Form>
                <Delete
                  professor={p}
                  onOk={() => refetch({ page: currentPage })}
                >
                  <Button
                    className="rounded-full"
                    icon={<DeleteTwoTone twoToneColor="red" />}
                  />
                </Delete>
              </div>
            ),
          },
        ]}
        loading={loading}
        dataSource={data?.professors.rows}
      />
      <div className="flex justify-end">
        <Pagination
          total={data?.professors.length || 0}
          pageSize={20}
          onChange={setCurrentPage}
        />
      </div>
    </AppLayout>
  );
};

export default PhisicalStates;
