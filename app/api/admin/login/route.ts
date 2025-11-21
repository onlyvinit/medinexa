// app/api/admin/login/route.ts
import { NextResponse } from "next/server";
import { getServerConfig } from "@/next.config";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const config = getServerConfig();

    const isValid =
      email === config.adminEmail && password === config.adminPassword;

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid admin credentials" },
        { status: 401 }
      );
    }

    const adminUser = {
      id: "admin_1",
      name: "Admin",
      email,
      role: "admin",
    };

    const response = NextResponse.json({
      success: true,
      user: adminUser,
      role: "admin",
    });

    response.cookies.set("auth_user", JSON.stringify(adminUser), {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
