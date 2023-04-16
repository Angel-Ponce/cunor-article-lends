import { Layout } from "antd";
import { FC, ReactNode } from "react";
import { useAtom } from "jotai";
import { isCollapsed as isCollapsedAtom } from "../../stores/sidebar";
import Sidebar from "../organisms/Sidebar";
import Header from "../organisms/Header";

const AppLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useAtom(isCollapsedAtom);

  return (
    <Layout hasSider>
      <Layout.Sider
        collapsible
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "calc(100vh - 48px)",
        }}
        width={200}
        collapsedWidth={80}
        collapsed={isCollapsed}
        onCollapse={(c) => setIsCollapsed(c)}
      >
        <div className="w-full h-auto py-5 px-2 text-white flex flex-col">
          <Sidebar collapsed={isCollapsed} />
        </div>
      </Layout.Sider>
      <Layout.Content
        className={`${
          isCollapsed ? "ml-[80px]" : "ml-[200px]"
        } px-10 py-8 min-h-screen`}
      >
        <Header />
        {children}
      </Layout.Content>
    </Layout>
  );
};

export default AppLayout;
