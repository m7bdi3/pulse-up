import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const challenges = await db.challenge.findMany({
      include: {
        participants: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
        _count: {
          select: {
            participants: true,
          },
        },
      },
    });

    return NextResponse.json(challenges);
  } catch (error) {
    console.error("Error fetching challenges:", error);
    return NextResponse.json(
      { error: "Error fetching challenges" },
      { status: 500 }
    );
  }
}
