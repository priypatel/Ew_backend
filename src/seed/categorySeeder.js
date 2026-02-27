import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Category from "../models/Category.js";

const categories = [
  { name: "Mobiles" },
  { name: "Laptops" },
  { name: "TV" },
  { name: "Sports" },
  { name: "Toys" },
];

async function seedCategories() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected");

    await Category.deleteMany();
    console.log("Old Categories deleted");

    await Category.insertMany(categories);
    console.log("New Categories added");

    process.exit();
  } catch (err) {
    console.error("Seeding Error:", err);
    process.exit(1);
  }
}
seedCategories();
