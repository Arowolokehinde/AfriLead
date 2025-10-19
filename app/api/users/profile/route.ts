import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import MentorProfile from "@/models/MentorProfile";
import MenteeProfile from "@/models/MenteeProfile";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET /api/users/profile - Get current user's profile
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const user = await User.findById(session.user.id).lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let mentorProfile = null;
    let menteeProfile = null;

    if (user.role === "mentor" || user.role === "both") {
      mentorProfile = await MentorProfile.findOne({ userId: user._id }).lean();
    }

    if (user.role === "mentee" || user.role === "both") {
      menteeProfile = await MenteeProfile.findOne({ userId: user._id }).lean();
    }

    return NextResponse.json({
      user,
      mentorProfile,
      menteeProfile,
    });
  } catch (error: any) {
    console.error("Get user profile error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH /api/users/profile - Update current user's profile
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updates = await req.json();

    await dbConnect();

    // Update user basic info
    const user = await User.findByIdAndUpdate(
      session.user.id,
      {
        $set: {
          name: updates.name,
          photoUrl: updates.photoUrl,
          country: updates.country,
        },
      },
      { new: true }
    ).lean();

    return NextResponse.json({
      user,
      message: "Profile updated successfully",
    });
  } catch (error: any) {
    console.error("Update user profile error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
