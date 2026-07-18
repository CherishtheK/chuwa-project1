import { Link } from "react-router-dom";
import { Search, User, ShoppingCart } from "lucide-react";

function Header() {
  return (
    <header className="flex items-center justify-between bg-ink text-white px-6 py-3 gap-4">
      <Link to="/" className="text-xl font-bold">
        Management <span className="text-xs">Chuwa</span>
      </Link>

      <div className="relative max-w-md flex-1">
        <input
          type="text"
          placeholder="Search your products"
          className="w-full rounded-md bg-white px-4 py-2 pr-10 text-ink outline-none"
        />
        <Search
          size={24}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      <div className="flex items-center gap-6">
        <Link
          to="/signin"
          className="flex items-center gap-2 text-white hover:text-gray-300"
        >
          <User size={24} />
          Sign In
        </Link>
        <div className="flex items-center gap-1 text-white">
          <ShoppingCart size={24} />
          <span>$0.00</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
