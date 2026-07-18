import { FaYoutube, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
function Footer() {
  return (
    <footer className="flex items-center justify-between bg-ink text-white px-6 py-6 gap-4">
      <p>©2026 All Rights Reserved.</p>
      <div className="flex items-center gap-4 text-white">
        <FaYoutube />
        <FaXTwitter />
        <FaFacebook />
      </div>
      <nav className="flex items-center gap-6">
        <a href="#">Contact us</a>
        <a href="#">Privacy Policies</a>
        <a href="#">Help</a>
      </nav>
    </footer>
  );
}

export default Footer;
