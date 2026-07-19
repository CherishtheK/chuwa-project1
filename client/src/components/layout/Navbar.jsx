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
import { useEffect } from "react";

const { Header } = Layout;

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const total = useSelector(state => state.cart.total);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  return (
    <Header
      className="bg-ink!"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px",
        fontSize: 16,
      }}
    >
      <Link to="/" style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
        Management <span style={{ fontSize: 16 }}>Chuwa</span>
      </Link>

      <div
        style={{
          position: "relative",
          flex: 1,
          maxWidth: 400,
          margin: "0 24px",
        }}
      >
        <input
          type="text"
          placeholder="Search your products"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 6,
            padding: "6px 36px 6px 12px",
            outline: "none",
            background: "white",
          }}
        />
        <SearchOutlined
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {isAuthenticated ? (
          <span
            style={{ color: "white", cursor: "pointer" }}
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
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => navigate("/signin")}
          >
            <UserOutlined /> Sign In
          </span>
        )}
        <Badge count={totalQuantity}>
          <ShoppingCartOutlined className="!text-white text-2xl"/>
        </Badge>

        <span style={{ color: "white" }}>
             ${total}
        </span>

      </div>
    </Header>
  );
}

export default Navbar;
