import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const categories = await db.category.findMany();
    const adminCount = await db.adminUser.count();

    return NextResponse.json({
      status: "✅ DB connected",
      categories,
      adminUsers: adminCount,
    });
  } catch (error) {
    return NextResponse.json(
      { status: "❌ DB error", error: String(error) },
      { status: 500 }
    );
  }
}
