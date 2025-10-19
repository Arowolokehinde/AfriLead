import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import MentorProfile from "@/models/MentorProfile";
import MenteeProfile from "@/models/MenteeProfile";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const user = await User.findById(params.id).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch additional profile data based on role
    let profileData = null;

    if (user.role === "mentor" || user.role === "both") {
      const mentorProfile = await MentorProfile.findOne({ userId: user._id });
      if (mentorProfile) {
        profileData = {
          bio: mentorProfile.bio,
          skills: mentorProfile.skills,
          experience: mentorProfile.experience,
          availability: mentorProfile.availability,
          sessionsCompleted: mentorProfile.sessionsCompleted,
          rating: mentorProfile.rating,
        };
      }
    } else if (user.role === "mentee") {
      const menteeProfile = await MenteeProfile.findOne({ userId: user._id });
      if (menteeProfile) {
        profileData = {
          bio: menteeProfile.bio,
          interests: menteeProfile.interests,
          goals: menteeProfile.goals,
        };
      }
    }

    const response = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      country: user.country,
      photoUrl: user.photoUrl,
      createdAt: user.createdAt,
      profile: profileData,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
