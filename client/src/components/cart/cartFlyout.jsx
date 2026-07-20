import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, addOrUpdateCart, removeCart } from "../../features/cart/cartSlice";
import { CloseOutlined } from "@ant-design/icons";


function CartFlyout({open, onClose}) {
    const { items, subtotal, tax, total, totalQuantity } = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const handleAdd = async(productId, delta) => {
        await dispatch(addOrUpdateCart({productId, delta}))
        dispatch(fetchCart())

    }

    const handleRemove = async(productId) => {
        await dispatch(removeCart(productId))
        dispatch(fetchCart())
    }

    return (
        <Drawer 
            title={`Cart(${totalQuantity})`} 
            open = {open} 
            onClose ={onClose}
            closable = {false}
            extra = {<CloseOutlined className="text-white cursor-pointer" onClick={onClose}/>}
            styles={{header: {backgroundColor: "#5048e5", color: "white"}}}
            >
            
            {
                items.map(item => (
                    <div key={item.productId} className="flex items-center gap-4 py-4 border-b">
                        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <Button size="small" onClick={() => handleAdd(item.productId, -1)}>-</Button>
                                <span>{item.quantity}</span>
                                <Button size="small" onClick={() => handleAdd(item.productId, 1)}>+</Button>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-primary">${item.price}</p>
                            <Button onClick={() => handleRemove(item.productId)} type="text"
                                    className="text-sm text-ink underline mt-2">Remove</Button>
                        </div>
                    </div>
                ))
            }

            <div className="mt-4">
                <p className="font-md mb-2">Apply Discount Code</p>
                <div className="flex gap-2">
                <input type="text" placeholder="20 DOLLAR OFF"
                        className="flex-1 border rounded px-3 py-2" />
                <Button type="primary" style={{backgroundColor: "#5048e5", color: "white"}}>Apply</Button>
            </div>
            </div>

           

            <div className="border-t pt-4 mt-4 space-y-2" >
                <div className="flex justify-between"><span>Sutotal</span><span>${subtotal}</span></div>
                <div className="flex justify-between"><span>Tax</span><span>${tax}</span></div>
                <div className="flex justify-between"><span>Discount</span><span>-$0.00</span></div>
                <div className="flex justify-between"><span>Estimated total</span><span>${total}</span></div>
            </div>
            <Button type="primary" block className="mt-4" style={{backgroundColor: "#5048e5", color: "white"}}>Continue to checkout</Button>

        </Drawer>
    )
}


export default CartFlyout;