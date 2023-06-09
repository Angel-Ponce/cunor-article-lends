import { NextPage } from "next";
import AppLayout from "../../components/templates/AppLayout";
import { Button, Empty, Pagination, Table, Tag } from "antd";
import { useQuery } from "@apollo/client";
import { articlesQuery } from "./gql";
import { useEffect, useState } from "react";
import {
  CheckCircleOutlined,
  DeleteTwoTone,
  EditTwoTone,
  PlusOutlined,
  StopOutlined,
} from "@ant-design/icons";
import Delete from "./Delete";
import Form from "./Form";

const Articles: NextPage = () => {
  const { data, loading, refetch } = useQuery(articlesQuery, {
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
        locale={{
          emptyText: (
            <div className="w-full h-72 flex flex-col items-center justify-center gap-2">
              <Empty description="Aún no has agregado artículos"></Empty>
            </div>
          ),
        }}
        scroll={{ y: 500 }}
        pagination={false}
        columns={[
          {
            title: "Nombre",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Descripción",
            dataIndex: "description",
            key: "description",
          },
          {
            title: "Estado físico",
            key: "phisicalState",
            render: (_, { phisicalState }) => (
              <div className="px-4 py-1 rounded-full bg-gray-100 w-fit">
                {phisicalState.name}
              </div>
            ),
          },
          {
            title: "Serial",
            dataIndex: "serial",
            key: "serial",
          },
          {
            title: "Disponibilidad",
            key: "available",
            render: (_, { available }) => (
              <Tag
                icon={available ? <CheckCircleOutlined /> : <StopOutlined />}
                color={available ? "success" : "default"}
              >
                {available ? "disponible" : "ocupado"}
              </Tag>
            ),
          },
          {
            key: "actions",
            render: (_, a) => (
              <div className="flex items-center gap-2 text-lg">
                <Form
                  editing
                  article={a}
                  onOk={() => refetch({ page: currentPage })}
                >
                  <Button
                    className="rounded-full"
                    icon={<EditTwoTone twoToneColor="orange" />}
                  />
                </Form>
                <Delete article={a} onOk={() => refetch({ page: currentPage })}>
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
        dataSource={data?.articles.rows}
      />
      <div className="flex justify-end">
        <Pagination
          total={data?.articles.length || 0}
          pageSize={20}
          onChange={setCurrentPage}
        />
      </div>
    </AppLayout>
  );
};

export default Articles;
