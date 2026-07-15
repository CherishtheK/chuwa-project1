const express = require("express");
const router = express.Router();
const { requireJwt, requireVendorRole } = require("../middlewares/auth");
const Product = require("../models/Product");
const Cart = require("../models/Cart")

//add product & edit quantity
router.post('/items', requireJwt, async(req, res) => {
    try{
        const {productId, delta} = req.body;
        const curCart = await Cart.findOneAndUpdate(
            { userId: req.user.id},
            {},
            { upsert: true, new: true}
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
    res.status(200).json({ message: "TODO: delete item" });
})

//coupon code
// router.put("/", requireJwt)


module.exports = router;