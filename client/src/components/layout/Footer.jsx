import { YoutubeOutlined, TwitterCircleFilled, FacebookOutlined } from "@ant-design/icons";

function Footer() {
  return(
    <footer className="flex items-center justify-between px-8 py-6 bg-black text-white text-sm">
      <div>©2026 All Rights Reserved.</div>  
 
      <div className="flex gap-4 text-xl">
        <YoutubeOutlined />
        <TwitterCircleFilled />
        <FacebookOutlined />
      </div>

      <div className=" flex gap-6">
          <span>Contact us</span>
          <span>Privacy Policies</span>
          <span>Help</span>
      </div>


    </footer>
  ) 
}

export default Footer;
