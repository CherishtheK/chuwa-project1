const express = require("express");
const router = express.Router();
const { requireJwt, requireVendorRole } = require("../middlewares/auth");
const Product = require("../models/Product");
const Cart = require("../models/Cart")
const TAX_RATE = 0.1;
const ValidCoupon = {
    'SAVE20CHUWA':20,
    'SAVE30CHUWA':30,
    'SAVE50CHUWA':50,
    'SAVE100CHUWA':100
}

//add product & edit quantity
router.post('/items', requireJwt, async(req, res) => {
    try{
        const {productId, delta} = req.body;
        const curProduct = await Product.findById(productId)

        if(!curProduct){
            return res.status(404).json({message: "Product not found"})
        }

        const curCart = await Cart.findOneAndUpdate(
            { userId: req.user.id},
            {},
            { upsert: true, returnDocument: 'after'}
        );
        
        //update quantity
        const index = curCart.items.findIndex(item => item.productId.toString() === productId);
        if(index === -1){
            if(delta > 0){
                const initialQty = Math.min(delta, curProduct.stock);
                curCart.items.push({productId: productId, quantity: initialQty});
            }
        }
        else{
            let newQty = curCart.items[index].quantity + delta;

            if(newQty > curProduct.stock){
                newQty = curProduct.stock
            }
            if(newQty <= 0){
                curCart.items.splice(index, 1);
            }
            else{
                curCart.items[index].quantity = newQty;
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
        const coupon = curCart
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
        let cartChange = false;
        const iterItems = [];

        for(let item of curCart.items){
            const curItem = await Product.findById(item.productId);

            if(!curItem || curItem.stock === 0){
                cartChange = true;
                continue;
            }

            if(item.quantity > curItem.stock){
                item.quantity = curItem.stock;
                cartChange = true;
            }
            iterItems.push(item);
        }

        if(cartChange){
            curCart.items = iterItems;
            await curCart.save();
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
        const rawDiscount = curCart.couponCode && ValidCoupon[curCart.couponCode] ? ValidCoupon[curCart.couponCode] : 0;
        const subtotal = detailedItems.reduce((acc, cur) => {
            return acc + cur.subtotal;
        }, 0)
        const discount = subtotal >= rawDiscount ? rawDiscount : 0;
        const discountedSub = subtotal - discount;
        const totalQuantity = detailedItems.reduce((acc, cur) => {
            return acc + cur.quantity;
        }, 0)
        const tax = Math.round(discountedSub * TAX_RATE * 100) / 100;
        const total = discountedSub + tax;

        res.status(200).json({
            items: detailedItems,
            totalQuantity,
            subtotal,
            tax,
            total,
            discount,
            adjusted: cartChange
        })
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//coupon code
router.put("/coupon", requireJwt, async(req, res) => {
    try {
        const { coupon } = req.body;
        if(!ValidCoupon[coupon]){
            await Cart.findOneAndUpdate(
                {userId: req.user.id},
                {couponCode: null},
                {upsert: true}
            );
            return res.status(404).json({message: "invalid coupon code"})
        }
        const curCart = await Cart.findOneAndUpdate(
            {userId: req.user.id},
            {couponCode: coupon},
            {upsert: true, returnDocument:'after'}
        );
        res.status(200).json(curCart);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})


module.exports = router;
