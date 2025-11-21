import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const sampleProducts = [
  {
    name: "Paracetamol 500mg",
    description: "Pain relief and fever reducer",
    price: 50,
    stock: 100,
    image: "https://via.placeholder.com/150?text=Paracetamol"
  },
  {
    name: "Vitamin C 1000mg",
    description: "Immune support tablets",
    price: 120,
    stock: 80,
    image: "https://via.placeholder.com/150?text=Vitamin+C"
  },
  {
    name: "Cough Syrup",
    description: "Relieves cough and sore throat",
    price: 250,
    stock: 50,
    image: "https://via.placeholder.com/150?text=Cough+Syrup"
  },
  {
    name: "Antibiotic Ointment",
    description: "Topical antibiotic for minor cuts",
    price: 180,
    stock: 40,
    image: "https://via.placeholder.com/150?text=Ointment"
  },
  {
    name: "Multivitamin Capsules",
    description: "Daily multivitamins for overall health",
    price: 300,
    stock: 60,
    image: "https://via.placeholder.com/150?text=Multivitamin"
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    const count = await Product.countDocuments();
    if (count > 0) {
      console.log("Products already exist. Skipping seed.");
      process.exit(0);
    }

    await Product.insertMany(sampleProducts);
    console.log("Sample products seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();
