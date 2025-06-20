const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route POST /api/users/register
// @desc Register a new user
// @access Public

router.post("/register", async (req, res) => {
  const { name, phone, email, password } = req.body;

  try {
    let user = await User.findOne({ phone });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ name, phone, email, password });
    await user.save();

    //create JWT payload
    const payload = { user: { id: user._id, role: user.role } };

    //sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      (err, token) => {
        if (err) throw err;

        //send the user and token in response
        res.status(201).json({
          user: {
            _id: user.id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @route POST /api/users/login
// @desc Authenticate user
// @access Public
router.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  try {
    //find the user by email
    let user = await User.findOne({ phone });

    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    //create JWT payload
    const payload = { user: { id: user._id, role: user.role } };

    //sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      (err, token) => {
        if (err) throw err;

        //send the user and token in response
        res.json({
          user: {
            _id: user.id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//@route GET /api/users/profile
//@desc get the logged-in user's profile
//@access protected
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
