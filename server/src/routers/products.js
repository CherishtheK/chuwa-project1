const express = require("express");
const router = express.Router();
const { requireVendorRole } = require("../middlewares/auth");
const Product = require("../models/Product");
const DEFAULT_LIMIT = 10;

//get product list(pagination, sorting, search)
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
router.get('/:id', (req, res) => {
    res.json({message: "detail placeholder", id: req.params.id});
});


//create products
router.post('/', requireVendorRole, async(req, res) => {
    res.json({message: "detail placeholder", id: req.params.id});

});


//edit products
router.put('/:id', requireVendorRole, async(req, res) => {
    res.json({message: "detail placeholder", id: req.params.id});

});

//delete products
router.delete('/:id', requireVendorRole, async(req, res) => {
    res.json({message: "detail placeholder", id: req.params.id});
});


module.exports = router;