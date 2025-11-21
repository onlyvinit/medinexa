// app/api/migrate/route.ts
// One-time migration script to move localStorage orders to MongoDB
import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { OrderDocument } from "@/app/models/Order";

export async function POST(req: Request) {
  try {
    const { orders } = await req.json();

    if (!orders || orders.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No orders to migrate",
      });
    }

    const client = await clientPromise;
    const db = client.db("medinexa");

    // Insert all orders
    const result = await db
      .collection<OrderDocument>("orders")
      .insertMany(orders);

    return NextResponse.json({
      success: true,
      message: `Migrated ${result.insertedCount} orders to MongoDB`,
      count: result.insertedCount,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
