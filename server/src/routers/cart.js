const express = require("express");
const router = express.Router();
const { requireJwt, requireVendorRole } = require("../middlewares/auth");
const Product = require("../models/Product");
const Cart = require("../models/Cart")
const TAX_RATE = 0.1;

//add product & edit quantity
router.post('/items', requireJwt, async(req, res) => {
    try{
        const {productId, delta} = req.body;
        const curCart = await Cart.findOneAndUpdate(
            { userId: req.user.id},
            {},
            { upsert: true, returnDocument: 'after'}
        );
        
        //update quantity
        const index = curCart.items.findIndex(item => item.productId.toString() === productId);
        if(index === -1){
            curCart.items.push({productId: productId, quantity: delta});
        }
        else{
            curCart.items[index].quantity += delta;
            if(curCart.items[index].quantity <= 0){
                curCart.items.splice(index, 1);
            }
        }

        await curCart.save()
        res.status(200).json(curCart);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

//delete product from cart
router.delete('/items/:id', requireJwt, async(req, res) => {
    try{
        const productId = req.params.id;
        const curCart = await Cart.findOne({userId: req.user.id});
        const index = curCart.items.findIndex(item => item.productId.toString() === productId);
        if(index === -1){
            res.status(404).json({message: "Product not found in cart"});
        }
        else{
            curCart.items.splice(index, 1);
            await curCart.save();
            res.status(200).json({message: "Product deleted successfully"});
        }
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

//get summary
router.get('/', requireJwt, async(req, res) => {
    try{
        const curCart = await Cart.findOne({userId: req.user.id});
        if(!curCart){
            return res.status(200).json({
                items: [],
                totalQuantity: 0,
                subtotal: 0,
                tax: 0,
                total: 0
            })
        }
        const detailedItems = await Promise.all(
            curCart.items.map(async(item) => {
                const curProduct = await Product.findById(item.productId);
                if(!curProduct) return null;
                
                return{
                    productId: item.productId,
                    name: curProduct.name,
                    imageUrl: curProduct.imageUrl,
                    price: curProduct.price,
                    quantity: item.quantity,
                    subtotal: curProduct.price * item.quantity
                }
            })
        )
        const validItems = detailedItems.filter(item => item !== null);
        const subtotal = validItems.reduce((acc, cur) => {
            return acc + cur.subtotal;
        }, 0)
        const totalQuantity = validItems.reduce((acc, cur) => {
            return acc + cur.quantity;
        }, 0)
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax;

        res.status(200).json({
            items: validItems,
            totalQuantity,
            subtotal,
            tax,
            total
        })
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//coupon code
// router.put("/", requireJwt)


module.exports = router;