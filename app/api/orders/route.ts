// app/api/orders/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { OrderDocument } from "@/app/models/Order";

// GET all orders
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("medinexa");

    const orders = await db
      .collection<OrderDocument>("orders")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST create new order
export async function POST(req: Request) {
  try {
    const order: OrderDocument = await req.json();

    const client = await clientPromise;
    const db = client.db("medinexa");

    const result = await db
      .collection<OrderDocument>("orders")
      .insertOne(order);

    return NextResponse.json({
      success: true,
      order: { ...order, _id: result.insertedId },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
