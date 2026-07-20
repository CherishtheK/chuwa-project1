import { Layout, Badge } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";
import { fetchCart, resetCart } from "../../features/cart/cartSlice";
import { useEffect, useState } from "react";
import CartFlyout from '../cart/CartFlyout';


const { Header } = Layout;

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const total = useSelector((state) => state.cart.total);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  return (
    <Header className="bg-ink! h-auto! flex flex-wrap items-center justify-between p-2 md:p-3 ">
      <Link
        to="/"
        className="text-xl md:text-2xl order-1 md:order-none text-white!"
      >
        <span className="hidden md:inline">Management </span>
        <span className="md:hidden">M</span>
        <span className="text-xs!">Chuwa</span>
      </Link>

      <div className="order-3 md:order-none w-full md:w-auto relative md:flex-1 md:max-w-[500px]">
        <input
          type="text"
          className="w-full rounded-md bg-surface pl-3 pr-10 h-8 "
          placeholder="Search your products"
        />
        <SearchOutlined className="absolute right-3 top-1/2 -translate-y-1/2 text-muted!" />
      </div>

      <div className="order-2 md:order-none flex items-center gap-4 md:gap-6">
        {isAuthenticated ? (
          <span
            className="cursor-pointer text-white! text-xs"
            onClick={() => {
              localStorage.removeItem("token");
              dispatch(logoutUser());
              dispatch(resetCart());
              navigate("/");
            }}
          >
            <UserOutlined /> Sign Out
          </span>
        ) : (
          <span
            className="cursor-pointer text-white! text-xs"
            onClick={() => navigate("/signin")}
          >
            <UserOutlined /> Sign In
          </span>
        )}
        <Badge count={totalQuantity}>
          <ShoppingCartOutlined className="!text-white text-2xl" onClick={() => setOpenCart(true)} />
        </Badge>
          <CartFlyout open={openCart} onClose={() => setOpenCart(false)} />

        <span style={{ color: "white" }}>${total}</span>
      </div>
    </Header>
  );
}

export default Navbar;
