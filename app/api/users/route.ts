import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { UserDocument } from "@/app/models/User";

// GET all users
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("medinexa");

    const users = await db
      .collection<UserDocument>("users")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Remove passwords from response
    const safeUsers = users.map(user => {
      const { password, ...rest } = user;
      return rest;
    });

    return NextResponse.json({ success: true, users: safeUsers });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
