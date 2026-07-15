const express = require("express");
const router = express.Router();
const { requireJwt, requireVendorRole } = require("../middlewares/auth");
const Product = require("../models/Product");
const DEFAULT_LIMIT = 10;

//get product list(pagination, sorting, search(bonus))
router.get('/', async(req, res) => {
    try{
        const { page = 1, sortBy = "createdAt", sortOrder = "desc" } = req.query;
        const skip = (Number(page) - 1) * DEFAULT_LIMIT;

        //get products with pagination
        const products = (await Product.find({})
            .sort({[sortBy]: sortOrder})
            .skip(skip)
            .limit(DEFAULT_LIMIT));
        const total = await Product.countDocuments({})
        const totalPages = Math.ceil(total / DEFAULT_LIMIT);

        //return products with pagination
        res.status(200).json({
            items: products,
            total: total,
            totalPages: totalPages,
            page: Number(page),
            limit: DEFAULT_LIMIT
        });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
    
});

//get product description
router.get('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});


//create products
router.post('/', requireJwt, requireVendorRole, async(req, res) => {
    try{
        const{ name, price, imageUrl, description="", stock, category="books"} = req.body;
        const newProduct = new Product({
            name: name,
            price: price,
            imageUrl: imageUrl,
            description: description,
            stock: stock,
            category: category,
        }) 
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    }
    catch(err){
        res.status(500).json({err: err.message});
    }

});


//edit products
router.put('/:id', requireJwt, requireVendorRole, async(req, res) => {
    try{
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if(!updatedProduct){
            return res.status(404).json({message: "Product cannot be found"});
        }
        res.status(200).json(updatedProduct);
    }
    catch(err){
        res.status(500).json({message: "err.message"});
    }
});

//delete products
router.delete('/:id', requireJwt, requireVendorRole, async(req, res) => {
    try{
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if(!deletedProduct){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({message: "Product deleted!", data: deletedProduct});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});


module.exports = router;