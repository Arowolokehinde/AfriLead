import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import MentorProfile from "@/models/MentorProfile";
import User from "@/models/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET /api/mentors - Get all active mentors
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const skills = searchParams.get("skills")?.split(",") || [];
    const industry = searchParams.get("industry");
    const minRating = searchParams.get("minRating");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Build query
    const query: any = { isActive: true };

    if (skills.length > 0) {
      query.skills = { $in: skills };
    }

    if (industry) {
      query.industry = industry;
    }

    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    const skip = (page - 1) * limit;

    const [mentors, total] = await Promise.all([
      MentorProfile.find(query)
        .populate("userId", "name email country photoUrl")
        .sort({ rating: -1, sessionsCompleted: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      MentorProfile.countDocuments(query),
    ]);

    return NextResponse.json({
      mentors,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Get mentors error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/mentors - Create mentor profile
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    await dbConnect();

    // Check if mentor profile already exists
    const existingProfile = await MentorProfile.findOne({ userId: session.user.id });
    if (existingProfile) {
      return NextResponse.json(
        { error: "Mentor profile already exists" },
        { status: 409 }
      );
    }

    // Create mentor profile
    const mentorProfile = await MentorProfile.create({
      userId: session.user.id,
      ...data,
    });

    // Update user role if needed
    await User.findByIdAndUpdate(session.user.id, {
      role: session.user.role === "mentee" ? "both" : "mentor",
    });

    return NextResponse.json(
      { mentor: mentorProfile, message: "Mentor profile created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create mentor profile error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
