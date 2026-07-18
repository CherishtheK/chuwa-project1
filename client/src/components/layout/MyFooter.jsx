import { Layout } from "antd";
import { FaYoutube, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const { Footer } = Layout;

function MyFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <Footer
      className="bg-ink!"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "white",
        padding: "20px",
      }}
    >
      <p>©{currentYear} All Rights Reserved.</p>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <FaYoutube />
        <FaXTwitter />
        <FaFacebook />
      </div>
      <nav style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <a href="#" style={{ color: "white" }}>
          Contact us
        </a>
        <a href="#" style={{ color: "white" }}>
          Privacy Policies
        </a>
        <a href="#" style={{ color: "white" }}>
          Help
        </a>
      </nav>
    </Footer>
  );
}

export default MyFooter;
