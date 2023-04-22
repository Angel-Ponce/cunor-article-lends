import { NextPage } from "next";
import AppLayout from "../components/templates/AppLayout";
import { Button, Pagination, Table } from "antd";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import { lendsQuery } from "./lends/gql";
import { format, parseISO } from "date-fns";
// import Delete from "./Delete";
// import Form from "./Form";

const Lends: NextPage = () => {
  const { data, loading, refetch } = useQuery(lendsQuery, {
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
        {/* <Form onOk={() => refetch({ page: currentPage })}> */}
        <Button type="primary" icon={<PlusOutlined />}>
          Nuevo
        </Button>
        {/* </Form> */}
      </div>
      <Table
        scroll={{ y: 500 }}
        pagination={false}
        columns={[
          {
            title: "Fecha de prestamos",
            key: "createdAt",
            render: (_, { createdAt }) => (
              <>{format(parseISO(createdAt), "dd/MM/yy 'a las' hh:mm aaaa")}</>
            ),
          },
          {
            key: "actions",
            render: (_, p) => (
              <div className="flex items-center gap-2 text-lg">
                {/* <Form
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
                </Delete> */}
                <p>Editar</p>
                <p>Borrar</p>
              </div>
            ),
          },
        ]}
        loading={loading}
        dataSource={data?.lends.rows}
      />
      <div className="flex justify-end">
        <Pagination
          total={data?.lends.length || 0}
          pageSize={20}
          onChange={setCurrentPage}
        />
      </div>
    </AppLayout>
  );
};

export default Lends;
