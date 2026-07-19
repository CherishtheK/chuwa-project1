import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addOrUpdateCartItem, removeCartItem } from '../../api/cart'
import { fetchCart } from "../../features/cart/cartSlice";


function CartFlyout({open, onClose}) {
    const { items, subtotal, tax, total, totalQuantity } = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const handleAdd = (productId, delta) => {
        await dispatch(addOrUpdateCartItem(productId, delta))
        dispatch(fetchCart())

    }

    const handleRemove = (productId) => {
        await dispatch(removeCartItem(productId))
        dispatch(fetchCart())
    }

    return (
        <Drawer title={`Cart(${totalQuantity})`} open = {open} onClose ={onClose}>
            
            {
                items.map(item => (
                    <div key={item.productId} className="flex flex-col">
                        <img src={item.imageUrl} alt={item.name} />
                        <div>
                            <span>{item.name}</span>
                            <Button onClick={() => handleAdd(item.productId, -1)}>-</Button>
                            <span>{item.quantity}</span>
                            <Button onClick={() => handleAdd(item.productId, 1)}>+</Button>
                        </div>
                        <div>
                            <span>${item.price}</span>
                            <Button onClick={() => handleRemove(item.productId)}>Remove</Button>
                        </div>
                    </div>
                ))
            }

            <p>Apply Discount Code</p>
            <div className="flex">
                <input type="text" />
                <Button>Apply</Button>
            </div>
            <hr />
            <div >
                <p>Sutotal: ${subtotal}</p>
                <p>Tax: ${tax}</p>
                <p>Discount: -$0.00</p>
                <p>Estimated total: ${total}</p>
            </div>
            <Button type="primary">Continue to checkout</Button>

        </Drawer>
    )
}