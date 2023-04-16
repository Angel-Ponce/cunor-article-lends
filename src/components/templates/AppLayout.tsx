import { Layout, Typography } from "antd";
import { FC, ReactNode } from "react";
import { useAtom } from "jotai";
import { isCollapsed as isCollapsedAtom } from "../../stores/sidebar";
import { app as appAtom } from "../../stores/app";
import Sidebar from "../organisms/Sidebar";

const AppLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useAtom(isCollapsedAtom);
  const [app] = useAtom(appAtom);

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
        <div className="w-full py-4 mb-8 flex items-center justify-between">
          <div className="flex gap-2 items-center">
            {app.icon && (
              <div className="text-xl flex justify-center items-center rounded-full w-8 h-8 bg-[#001529] text-white">
                {app.icon}
              </div>
            )}
            {app.title && (
              <Typography.Title level={2} className="!my-0">
                {app.title}
              </Typography.Title>
            )}
          </div>
        </div>
        {children}
      </Layout.Content>
    </Layout>
  );
};

export default AppLayout;
