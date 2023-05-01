import { Statistic } from "antd";
import AppLayout from "../components/templates/AppLayout";
import {
  CheckCircleTwoTone,
  CodeSandboxOutlined,
  IdcardTwoTone,
  StopTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { dashboardQuery } from "./gql";

const Home = () => {
  const { data, loading } = useQuery(dashboardQuery);

  return (
    <AppLayout>
      <div className="flex items-center justify-around flex-wrap">
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
        <Statistic
          loading={loading}
          title="Prestamos completos"
          value={data?.kpis.countCompletedLends || 0}
          prefix={<CheckCircleTwoTone twoToneColor="#52c41a" />}
        />
        <Statistic
          loading={loading}
          title="Prestamos pendientes"
          value={data?.kpis.countActiveLends || 0}
          prefix={<StopTwoTone twoToneColor="lightgray" />}
        />
      </div>
    </AppLayout>
  );
};

export default Home;
