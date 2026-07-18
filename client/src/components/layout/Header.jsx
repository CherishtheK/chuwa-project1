import { Input } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons"
import { Badge, Button } from 'antd';
import { useSelector } from "react-redux";

function Header() {
  const user = useSelector(state => state.auth.user)
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-black text-white">
      <div className="mr-8 text-2xl font-bold">
        Management <span className="text-sm">Chuwa</span>
      </div>

      
      <div className="flex-1 flex items-center">
        <Input.Search placeholder="Search" className="!w-96" />
      </div>


      <div className="flex items-center gap-6">
        <Button type="text" className="!text-white text-lg">
          {user? "Sign Out" : "Sign In"}
        </Button>
        <Badge count={2}>
          <ShoppingCartOutlined className="!text-2xl !text-white" />
        </Badge>
        <span>$price</span>
      </div>

    </header>
  );
}

export default Header;
