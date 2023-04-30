import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  rating: number;
}

const ProductSchema = new mongoose.Schema<Product>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String, required: true },
  rating: { type: Number, required: true },
});

const ProductModel = mongoose.model<Product>(
  "Product",
  ProductSchema,
  "products"
);

const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected.");
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any);
  console.log("Connected to MongoDB.");
};

const getProducts = async (): Promise<Product[]> => {
  await connectToDatabase();
  const products = await ProductModel.find({});
  return products;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[] | { message: string }>
) {
  try {
    const products = await getProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
}
