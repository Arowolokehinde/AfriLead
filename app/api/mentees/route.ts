import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import MenteeProfile from "@/models/MenteeProfile";
import User from "@/models/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// POST /api/mentees - Create mentee profile
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    await dbConnect();

    // Check if mentee profile already exists
    const existingProfile = await MenteeProfile.findOne({ userId: session.user.id });
    if (existingProfile) {
      return NextResponse.json(
        { error: "Mentee profile already exists" },
        { status: 409 }
      );
    }

    // Create mentee profile
    const menteeProfile = await MenteeProfile.create({
      userId: session.user.id,
      ...data,
    });

    // Update user role if needed
    await User.findByIdAndUpdate(session.user.id, {
      role: session.user.role === "mentor" ? "both" : "mentee",
    });

    return NextResponse.json(
      { mentee: menteeProfile, message: "Mentee profile created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create mentee profile error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
