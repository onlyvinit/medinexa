// app/api/orders/[id]/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { OrderDocument } from "@/app/models/Order";

// GET single order by ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const client = await clientPromise;
    const db = client.db("medinexa");

    const order = await db.collection<OrderDocument>("orders").findOne({ id });

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PATCH update order status
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    const client = await clientPromise;
    const db = client.db("medinexa");

    const result = await db
      .collection<OrderDocument>("orders")
      .updateOne({ id }, { $set: { status } });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    const updatedOrder = await db
      .collection<OrderDocument>("orders")
      .findOne({ id });

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
