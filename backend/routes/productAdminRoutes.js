const express = require("express")
const Product = require("../models/Product")
const {protect, admin} = require("../middleware/authMiddleware")
const cloudinary = require("cloudinary").v2;

const router = express.Router()

// @route GET /api/admin/products
// @desc Get all products (Admin only)
// @access Private/Admin
router.get("/", protect, admin, async(req,res)=>{
    try {
        const products = await Product.find({});
        res.json(products)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"})     
    }
});

// @route DELETE /api/admin/products/delete-img
// @desc Delete image from Cloudinary
// @access Private/Admin
router.delete("/delete-img", protect, admin, async (req, res) => {
    const { public_id } = req.body;
    if (!public_id) {
        return res.status(400).json({ message: "public_id is required" });
    }
    try {
        const result = await cloudinary.uploader.destroy(public_id);
        if (result.result !== "ok") {
            return res.status(400).json({ message: "Failed to delete image" });
        }
        res.json({ message: "Image deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;