import { NextPage } from "next";
import AppLayout from "../components/templates/AppLayout";
import { Avatar, Button, Pagination, Table, Tag } from "antd";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  CheckCircleOutlined,
  CheckOutlined,
  DeleteTwoTone,
  PlusOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { lendsQuery } from "./lends/gql";
import {
  compareAsc,
  format,
  formatDistance,
  formatDistanceToNow,
  parseISO,
} from "date-fns";
import { es } from "date-fns/locale";
// import Delete from "./Delete";
import Form from "./lends/Form";

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
            title: "Fecha de prestamos",
            key: "createdAt",
            render: (_, { createdAt }) => (
              <>{format(parseISO(createdAt), "dd/MM/yy 'a las' hh:mm aaaa")}</>
            ),
          },
          {
            title: "Usuario que presta",
            key: "user",
            render: (_, { user }) => (
              <div className="flex items-center gap-2">
                <Avatar
                  src={`https://api.dicebear.com/6.x/identicon/svg?seed=${user.name} ${user.lastname}`}
                  alt={user.name}
                  size={36}
                />
                <p>
                  {user.name} {user.lastname}
                </p>
              </div>
            ),
          },
          {
            title: "Profesor que presta",
            key: "professor",
            render: (_, { professor }) => (
              <div className="flex items-center gap-2">
                <Avatar
                  src={`https://api.dicebear.com/6.x/identicon/svg?seed=${professor.name} ${professor.lastname}`}
                  alt={professor.name}
                  size={36}
                />
                <p>
                  {professor.name} {professor.lastname}
                </p>
              </div>
            ),
          },
          {
            title: "Fecha de devolución",
            key: "dueDate",
            render: (_, { dueDate, completed }) => (
              <div className="flex flex-col">
                <p>
                  {" "}
                  {format(parseISO(dueDate), "dd/MM/yy 'a las' hh:mm aaaa")}
                </p>
                <p
                  className={
                    compareAsc(new Date(), parseISO(dueDate)) == 1
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {!completed &&
                    formatDistanceToNow(parseISO(dueDate), {
                      addSuffix: true,
                      locale: es,
                      includeSeconds: true,
                    })}
                </p>
              </div>
            ),
          },
          {
            title: "Devolución",
            key: "devolution",
            render: (_, { dueDate, realDueDate, completed }) => (
              <div className="flex flex-col">
                <Tag
                  color={completed ? "success" : "default"}
                  icon={completed ? <CheckCircleOutlined /> : <StopOutlined />}
                  className="w-fit"
                >
                  {completed ? "completado" : "pendiente"}
                </Tag>
                {realDueDate && (
                  <p
                    className={
                      compareAsc(parseISO(realDueDate), parseISO(dueDate)) == 1
                        ? "text-red-500"
                        : "text-green-500"
                    }
                  >
                    {formatDistance(parseISO(realDueDate), parseISO(dueDate), {
                      includeSeconds: true,
                      locale: es,
                    })}{" "}
                    {compareAsc(parseISO(realDueDate), parseISO(dueDate)) == 1
                      ? "de retraso"
                      : "de anticipación"}
                  </p>
                )}
              </div>
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
                > */}
                <Button
                  className="rounded-full"
                  icon={<CheckOutlined className="text-green-500" />}
                />
                {/* </Form>
                <Delete
                  phisicalState={p}
                  onOk={() => refetch({ page: currentPage })}
                > */}
                <Button
                  className="rounded-full"
                  icon={<DeleteTwoTone twoToneColor="red" />}
                />
                {/* </Delete> */}
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
