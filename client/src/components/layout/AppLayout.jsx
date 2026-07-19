import Header from "./Navbar";
import Footer from "./MyFooter";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

const { Content } = Layout;

function AppLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Content style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
}

export default AppLayout;
