import { NextPage } from "next";
import AppLayout from "../../components/templates/AppLayout";
import { Button, Pagination, Table, Tag } from "antd";
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

const PhisicalStates: NextPage = () => {
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
            render: (_, { phisicalState }) => <>{phisicalState.name}</>,
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

export default PhisicalStates;
