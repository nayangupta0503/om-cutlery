const mongoose = require("mongoose");
const dotenv = require("dotenv");
const readline = require("readline");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart")
const products = require("./data/products");

dotenv.config();

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to seed DATA

const seedData = async () => {
  try {
    //Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // Create a default admin User
    const createdUser = await User.create({
      name: "Admin User",
      phone: 9574860773,
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    // Assign the default user ID to each product
    const userID = createdUser._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    // Insert the products into the database
    await Product.insertMany(sampleProducts);
    console.log("product data seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding the data:", error);
    process.exit(1);
  }
};

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Ask for confirmation
rl.question("Are you sure you want to delete all data and seed the database? (y/n): ", (answer) => {
  if (answer.toLowerCase() === "y") {
    seedData();
  } else {
    console.log("Operation cancelled.");
    process.exit();
  }
});
