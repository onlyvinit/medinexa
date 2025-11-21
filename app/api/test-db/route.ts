import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mydb");

    // Try a simple command
    const result = await db.command({ ping: 1 });

    return Response.json({
      success: true,
      message: "MongoDB connected successfully!",
      result,
    });
  } catch (error: any) {
    return Response.json({
      success: false,
      message: "MongoDB connection failed",
      error: error.message,
    });
  }
}
