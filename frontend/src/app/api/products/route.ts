import connectDB from '@/lib/db';
import Product from '@/models/Products';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectDB(); // Open the connection
    const body = await req.json(); // Get the data from the form

    // Create a new product in MongoDB
    const newProduct = await Product.create(body);

    return NextResponse.json({ message: 'Item listed!', product: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error saving item', error }, { status: 500 });
  }
}