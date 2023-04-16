import { Layout } from "antd";
import { FC, ReactNode, useState } from "react";

const AppLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
        onCollapse={(c) => setIsCollapsed(c)}
      >
        <div className="w-full h-auto p-5">
          <div className="text-white">Sidebar go here</div>
        </div>
      </Layout.Sider>
      <Layout.Content
        className={`${isCollapsed ? "ml-[80px]" : "ml-[200px]"} px-6 py-8`}
      >
        {children}
      </Layout.Content>
    </Layout>
  );
};

export default AppLayout;
