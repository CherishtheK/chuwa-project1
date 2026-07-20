import { Layout } from "antd";
import { FaYoutube, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const { Footer } = Layout;

function MyFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <Footer className="bg-ink! flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0 text-center  text-white!">
      <div className="order-3 md:order-0">
        ©{currentYear} All Rights Reserved.
      </div>
      <div className="order-1 md:order-0 flex items-center gap-4">
        <FaYoutube />
        <FaXTwitter />
        <FaFacebook />
      </div>
      <nav className="order-2 md:order-0 flex items-center gap-4">
        <span className="cursor-pointer">Contact us</span>
        <span href="#" className="cursor-pointer">
          Privacy Policies
        </span>
        <span href="#" className="cursor-pointer">
          Help
        </span>
      </nav>
    </Footer>
  );
}

export default MyFooter;
