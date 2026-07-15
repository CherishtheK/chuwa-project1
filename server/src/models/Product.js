const mongoose = require("mongoose");


const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        imageUrl: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        stock: {
            type: Number,
            required: true,
            min: 0
        },
        category: {
            type: String,
            enum: ["electronics", "clothing", "books"]
        },
        vendorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }

    },
    {timestamps: true}
)

const Product = mongoose.model("Product", productSchema);

module.exports = Product;