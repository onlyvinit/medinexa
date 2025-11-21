import { NextResponse } from "next/server";
import { products } from "@/app/database/product";

export async function POST(req: Request) {
  const { slug } = await req.json();

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return NextResponse.json(
      { success: false, error: "Product not found" },
      { status: 404 }
    );
  }
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return NextResponse.json({
    success: true,
    message: "Mock payment success",
    product,
    orderId: "order_" + Date.now(),
  });
}
