import { useEffect, useState } from "react";
import { useSelector} from "react-redux";
import { getProducts } from '../api/products';
import { Select, Button } from 'antd';
import ProductCard from '../components/ProductCard';

const sortOptions = [
  {value: 'createdAt_desc', label: "Last added"},
  {value: "price_asc", label: "Price: Low to High"},
  {value: "price_desc", label: "Price: High to Low"}
]

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('desc');
  const [totalPages, setTotalPages] = useState(1);
  const user = useSelector((state) => state.auth.user);
  const isVendor = user?.role === 'vendor';  

  useEffect(() => {
    getProducts({ page, sortBy, sortOrder})
      .then(res => {
        setProducts(res.data.items);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => console.log(err))
  }, [page, sortBy, sortOrder])

  const handleSortChange = (value) => {
    const [newSortBy, newSortOrder] = value.split('_');
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  }

  return (
    <div className="px-8 py-6">
      <div className="flex justify-between px-6 py-4 text-3xl font-bold">
      Products
        <Select
            value = {`${sortBy}_${sortOrder}`}
            onChange={handleSortChange}
            options ={sortOptions} />
        
      </div>
      <div>
        <div className="grid grid-cols-5 gap-4">
          {products.map(p => <ProductCard key ={p._id} product={p} isVendor={isVendor} />)}
        </div>
      
          
        <button disabled={page <= 1} onClick={() => setPage(prev => prev - 1)}>Back</button>
        <span>{page}/{totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(prev => prev + 1)}>Next</button>
      </div>
    </div>
    );
}

export default ProductListPage;
