import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import MentorProfile from "@/models/MentorProfile";
import MenteeProfile from "@/models/MenteeProfile";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const { id } = await params;
    const user = await User.findById(id).select("-password");

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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Only allow users to update their own profile
    if (session.user.id !== id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await dbConnect();

    const body = await req.json();
    const { name, country, bio, experience, availability, skills, interests, goals } = body;

    // Update user basic info
    const user = await User.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(country && { country }),
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update role-specific profile
    if (user.role === "mentor" || user.role === "both") {
      await MentorProfile.findOneAndUpdate(
        { userId: user._id },
        {
          userId: user._id,
          ...(bio !== undefined && { bio }),
          ...(experience !== undefined && { experience }),
          ...(availability !== undefined && { availability }),
          ...(skills !== undefined && { skills }),
        },
        { upsert: true, new: true, runValidators: true }
      );
    }

    if (user.role === "mentee" || user.role === "both") {
      await MenteeProfile.findOneAndUpdate(
        { userId: user._id },
        {
          userId: user._id,
          ...(bio !== undefined && { bio }),
          ...(interests !== undefined && { interests }),
          ...(goals !== undefined && { goals }),
        },
        { upsert: true, new: true, runValidators: true }
      );
    }

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error: any) {
    console.error("Update user error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
