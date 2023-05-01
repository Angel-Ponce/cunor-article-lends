import { Statistic } from "antd";
import AppLayout from "../components/templates/AppLayout";
import {
  CodeSandboxOutlined,
  IdcardTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { dashboardQuery } from "./gql";
import EChartsReact from "echarts-for-react";
import { barChart, roseChart } from "./charts";

const Home = () => {
  const { data, loading, refetch } = useQuery(dashboardQuery, {
    fetchPolicy: "cache-and-network",
  });

  return (
    <AppLayout>
      <div className="flex items-center justify-around flex-wrap mb-10">
        <Statistic
          loading={loading}
          title="Usuarios registrados"
          value={data?.kpis.countUsers || 0}
          prefix={<UserOutlined className="text-[#1677FF]" />}
        />
        <Statistic
          loading={loading}
          title="Profesores registrados"
          value={data?.kpis.countProfessors || 0}
          prefix={<IdcardTwoTone />}
        />
        <Statistic
          loading={loading}
          title="Total de artículos"
          value={data?.kpis.countArticles || 0}
          prefix={<CodeSandboxOutlined className="text-orange-500" />}
        />
      </div>
      <div className="grid grid-cols-3 gap-4 h-[calc(100vh-300px)]">
        <div className="w-full h-full flex items-center justify-center">
          <EChartsReact
            className="w-full h-full max-w-full max-h-full"
            option={roseChart([
              {
                name: "Prestamos pendientes",
                value: data?.kpis.countActiveLends || 0,
                itemStyle: {
                  color: "#52c41a",
                  opacity: 0.65,
                },
              },
              {
                name: "Prestamos completos",
                value: data?.kpis.countCompletedLends || 0,
                itemStyle: {
                  color: "#349DFE",
                },
              },
            ])}
          />
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <EChartsReact
            className="w-full h-full max-w-full max-h-full"
            option={barChart(
              data?.userLends.map((u) => u.countLends) || [],
              data?.userLends.map((u) => u.name) || [],
              "Prestamos por usuario"
            )}
          />
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <EChartsReact
            className="w-full h-full max-w-full max-h-full"
            option={barChart(
              data?.professorLends.map((p) => p.countLends) || [],
              data?.professorLends.map((p) => p.name) || [],
              "Prestamos por profesor"
            )}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
