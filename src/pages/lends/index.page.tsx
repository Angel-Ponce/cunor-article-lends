import { NextPage } from "next";
import AppLayout from "../../components/templates/AppLayout";
import { Avatar, Button, Divider, Empty, Pagination, Table, Tag } from "antd";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  CheckCircleOutlined,
  CheckOutlined,
  DeleteTwoTone,
  PlusOutlined,
  PrinterTwoTone,
  StopOutlined,
} from "@ant-design/icons";
import { lendsQuery } from "./gql";
import {
  compareAsc,
  format,
  formatDistance,
  formatDistanceToNow,
  parseISO,
} from "date-fns";
import { es } from "date-fns/locale";
import Form from "./Form";
import Complete from "./Complete";
import Delete from "./Delete";

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
        locale={{
          emptyText: (
            <div className="w-full h-72 flex flex-col items-center justify-center gap-2">
              <Empty description="Aún no has agregado prestamos"></Empty>
            </div>
          ),
        }}
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
                {!p.completed && (
                  <Complete
                    lend={p}
                    onOk={() => refetch({ page: currentPage })}
                  >
                    <Button
                      className="rounded-full"
                      icon={<CheckOutlined className="text-green-500" />}
                    />
                  </Complete>
                )}
                <Delete lend={p} onOk={() => refetch({ page: currentPage })}>
                  <Button
                    className="rounded-full"
                    icon={<DeleteTwoTone twoToneColor="red" />}
                  />
                </Delete>
                <Button
                  className="rounded-full"
                  icon={<PrinterTwoTone></PrinterTwoTone>}
                  onClick={() => window.open(`/lends/print/${p.id}`, "_blank")}
                />
              </div>
            ),
          },
        ]}
        loading={loading}
        dataSource={data?.lends.rows.map((r) => ({ ...r, key: r.id }))}
        expandable={{
          expandedRowRender: (row) => (
            <div className="w-full flex gap-5 items-center justify-start flex-wrap">
              {row.articles.map((article) => (
                <div
                  key={article.article.id}
                  className="relative flex flex-col items-center bg-white shadow-xl rounded-xl py-2 px-6"
                >
                  <div className="-top-2.5 -right-2.5 absolute rounded-full text-xs w-7 h-7 bg-blue-500 text-white font-medium flex justify-center items-center">
                    x{article.count}
                  </div>
                  <p>{article.article.name}</p>
                  <p className="text-xs text-gray-400">
                    serial: {article.article.serial}
                  </p>
                  <Divider className="my-2"></Divider>
                  <p className="text-xs text-gray-400">
                    al entregar: <b>{article.initialPhisicalState.name}</b>
                  </p>
                  <p className="text-xs text-gray-400">
                    al devolver:{" "}
                    <b>{article.finalPhisicalState?.name || "sin devolver"}</b>
                  </p>
                </div>
              ))}
            </div>
          ),
        }}
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
