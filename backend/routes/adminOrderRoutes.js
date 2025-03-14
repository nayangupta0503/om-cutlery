const express = require("express")
const Order = require("../models/Order")
const {protect, admin} = require("../middleware/authMiddleware")

const router = express.Router()

// @route GET /api/admin/orders
// @desc Get all orders (Admin only)
// @access Private/Admin
router.get("/", protect, admin, async(req,res)=>{
    try {
        const orders = await Order.find({}).populate("user", "id name")
        res.json(orders)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"})
    }
});

module.exports = router;