import { Card, Button } from 'antd';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, addOrUpdateCart, removeCart } from '../features/cart/cartSlice';


function ProductCard({product, isVendor}){
    const curItems = useSelector(state => state.cart.items);
    const curProduct = curItems.find(item => item.productId.toString() === product._id.toString())
    const quantity = curProduct?.quantity || 0;
    const dispatch = useDispatch()

    const handleAdd = async (delta) => {
        await dispatch(addOrUpdateCart({productId: product._id, delta}));
        dispatch(fetchCart());
    }

    return (
        <Card
            cover={<img src={product.imageUrl} alt={product.name} className='h-48 object-cover'/>}
            className='w-full'>
            <h3 className='text-base font-medium'>{product.name}</h3>
            <p className='text-lg font-bold mt-1'>${product.price}</p>
            {
                product.stock === 0 && (
                    <span className='text-red-500 text-sm'>Out of Stock</span>
                )
            }
            <div className='flex gap-2 mt-3'>
                {quantity === 0? (<Button 
                    type='primary' 
                    disabled={product.stock === 0}
                    onClick={() => handleAdd(1)}>
                        Add
                </Button>) : (
                    <div className='flex items-center gap-2'>
                        <Button onClick={() => handleAdd(-1)}> - </Button>
                        <span className='w-6 text-center'>{quantity}</span>
                        <Button onClick={() => handleAdd(1)}> + </Button>
                    </div>
                )}
                {isVendor && <Button>Edit</Button>}
            </div>
        </Card>
        
    )
}

export default ProductCard;