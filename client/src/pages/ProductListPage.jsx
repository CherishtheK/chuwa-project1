import { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { getProducts } from '../api/products';
import { Select, Button, Pagination} from 'antd';
import ProductCard from '../components/ProductCard';
import { Link, useNavigate} from "react-router-dom";


const sortOptions = [
  { value: "createdAt_desc", label: "Last added" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("desc");
  const [totalPages, setTotalPages] = useState(1);
  const user = useSelector((state) => state.auth.currentUser);
  const isVendor = user?.role === "vendor";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  useEffect(() => {
    getProducts({ page, sortBy, sortOrder })
      .then((res) => {
        setProducts(res.data.items);
        setTotalPages(res.data.totalPages);
        setTotal(res.data.total);
      })
      .catch(err => console.log(err))
  }, [page, sortBy, sortOrder, total])



  const handleSortChange = (value) => {
    const [newSortBy, newSortOrder] = value.split("_");
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  return (
    <div className="px-8 py-6">
      <div className="flex justify-between px-6 py-4 text-3xl font-bold">
        Products
        <div className="flex items-center gap-3">
          <Select
            value={`${sortBy}_${sortOrder}`}
            onChange={handleSortChange}
            options={sortOptions}
          />
          {isVendor && (
            <Button
              type="primary"
              style={{ backgroundColor: "#5048e5", color: "white" }}
              onClick={() => navigate("products/create")}
            >
              Add product
            </Button>
          )}
        </div>
      </div>
      <div>
        <div className="grid grid-cols-5 gap-4">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} isVendor={isVendor} />
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <Pagination
            current={page}
            total={total}
            pageSize={10}
            onChange={(newPage) => setPage(newPage)}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductListPage;
