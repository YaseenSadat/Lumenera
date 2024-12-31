import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: Array, required: true},
    category: {type: String, required: true},
    subCategory: {type: String, required: true},
    rarities: {
        Standard: { type: Number, default: 0 },
        Runed: { type: Number, default: 0 },
        Sacred: { type: Number, default: 0 },
        Cursed: { type: Number, default: 0 },
      },
    bestseller: {type: Boolean},
    latestCollection: {type: Boolean},
    date: {type: Number, required:true},
})

const productModel = mongoose.models.product || mongoose.model("product", productSchema)

export default productModel