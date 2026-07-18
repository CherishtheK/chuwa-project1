import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { getProductById } from "../api/products";


function ProductDetailsPage() {
  const user = useSelector(state => state.auth.user);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const isVendor = user?.role === "vendor";

  useEffect(() => {
    getProductById(id)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err))
  }, [id])

  if(!product) return <div>loading...</div>

  return (
      <div className="max-w-6xl mx-auto py-4">
        <h2 className="text-2xl font-bold mb-4">Products Detail</h2>
        <div className="flex flex-col md:flex-row gap-8 bg-white p-6">
          <img src={product.imageUrl} alt={product.name} className="w-full max-w-lg aspect-square object-cover" />
          <div>
            <p className="text-gray-500">{product.category}</p>
            <h3 className="text-2xl font-bold mt-1">{product.name}</h3>
            <p className="text-xl font-bold mt-3">${product.price}</p>
            {product.stock === 0 && (
                <span className="text-red-500 text-sm ml-2"> Out of Stock</span>
            )}
            <p className="mt-4 text-gray-600">{product.description}</p>
            <div className="flex gap-3 mt-4">
                <Button type="primary" disabled={product.stock === 0}>Add to Cart</Button>
                {isVendor && <Button>Edit</Button>}
            </div>
          </div>
        </div>
      </div>
  );
}

export default ProductDetailsPage;
