import React, { ReactNode } from "react";
import { Layout } from "antd";

const { Header, Content } = Layout;

interface CommonLayoutProps {
  children: ReactNode;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => (
  <Layout>
    <Header style={headerStyle}>A Picture Framing Company</Header>
    <Content style={contentStyle}>{children}</Content>
  </Layout>
);

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
  fontSize: 21,
  fontWeight: "900",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  backgroundColor: "white",
};

export default CommonLayout;
