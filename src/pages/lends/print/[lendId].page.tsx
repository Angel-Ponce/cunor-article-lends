import { useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { lendQuery } from "../gql";
import { Button, Result, Spin } from "antd";

const PDF = dynamic(() => import("../PDF"), {
  ssr: false,
});

const Print = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(lendQuery, {
    variables: {
      id: Number(router.query.lendId || 0),
    },
  });

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spin tip="Cargando datos"></Spin>
      </div>
    );
  }

  if (error && !loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Result
          status="error"
          title="Error"
          subTitle="Ups, parece que algo ha salido mal, verifica si la información que estas consultando existe."
          extra={
            <Button type="primary" onClick={() => router.push("/")}>
              Volver a inicio
            </Button>
          }
        />
      </div>
    );
  }

  if (data) {
    return <PDF lend={data.lend} />;
  }

  return <></>;
};

export default Print;
