import { NextPage } from "next";
import AppLayout from "../../components/templates/AppLayout";
import { Button, Pagination, Table } from "antd";
import { useQuery } from "@apollo/client";
import { phisicalStatesQuery } from "./gql";
import { useEffect, useState } from "react";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import Delete from "./Delete";
import Form from "./Form";

const PhisicalStates: NextPage = () => {
  const { data, loading, refetch } = useQuery(phisicalStatesQuery, {
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
            key: "actions",
            render: (_, p) => (
              <div className="flex items-center gap-2 text-lg">
                <Form
                  editing
                  phisicalState={p}
                  onOk={() => refetch({ page: currentPage })}
                >
                  <Button
                    className="rounded-full"
                    icon={<EditTwoTone twoToneColor="orange" />}
                  />
                </Form>
                <Delete
                  phisicalState={p}
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
        dataSource={data?.phisicalStates.rows}
      />
      <div className="flex justify-end">
        <Pagination
          total={data?.phisicalStates.length || 0}
          pageSize={20}
          onChange={setCurrentPage}
        />
      </div>
    </AppLayout>
  );
};

export default PhisicalStates;
