import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { createProduct, getProductById } from "../api/products";
import { fetchCart, addOrUpdateCart, removeCart } from "../features/cart/cartSlice";


function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const curItems = useSelector(state => state.cart.items);
  const curProduct = curItems.find(item => item.productId.toString() === id);
  const quantity = curProduct?.quantity || 0;
  const user = useSelector(state => state.auth.currentUser);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [product, setProduct] = useState(null);
  const isVendor = user?.role === "vendor";

  useEffect(() => {
    dispatch(fetchCart());
  }, [])

  useEffect(() => {
    getProductById(id)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err))
  }, [id])

  if(!product) return <div>loading...</div>



  const handleAdd = async (delta) => {
    if(!isAuthenticated){
      navigate('/signin');
    }
    await dispatch(addOrUpdateCart({productId: id, delta}));
    dispatch(fetchCart());
  }

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
            {quantity === 0?(<Button 
                    type="primary" 
                    style={{backgroundColor: "#5048e5", color: "white"}}
                    disabled={product.stock === 0}
                    onClick={() => handleAdd(1)}>
                    Add to Cart
                </Button>) : (
                  <div className="flex items-center gap-2">
                    <Button onClick={() => handleAdd(-1)}> - </Button>
                    <span className="w-6 text-center">{quantity}</span>
                    <Button onClick={() => handleAdd(1)}> + </Button>
                  </div>
                )}
                {isVendor && <Button onClick={() => navigate(`/products/${id}/edit`)}>Edit</Button>}
            </div>
          </div>
        </div>
      </div>
  );
}

export default ProductDetailsPage;
