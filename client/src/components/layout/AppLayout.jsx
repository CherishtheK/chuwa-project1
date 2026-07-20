import Header from "./Navbar";
import Footer from "./MyFooter";
import { Outlet } from "react-router-dom";
import { Layout, message } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, resetCart } from "../../features/cart/cartSlice";

const { Content } = Layout;

function AppLayout() {
  const dispatch = useDispatch();
  const adjusted = useSelector((state) => state.cart.adjusted);
  const user = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    if(user?.id){
      dispatch(fetchCart());
    }
    else{
      dispatch(resetCart());
    }
  }, [user]);

  useEffect(() => {
      if (adjusted) {
          message.warning("Cart modified due to stock changes!");
      }
  }, [adjusted]);
  
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Content style={{ flex: 1 }}>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
}

export default AppLayout;
