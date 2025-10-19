import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import Session from "@/models/Session";
import MentorProfile from "@/models/MentorProfile";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET /api/sessions - Get sessions for current user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const upcoming = searchParams.get("upcoming") === "true";

    let query: any = {
      $or: [{ mentorId: session.user.id }, { menteeId: session.user.id }],
    };

    if (status) {
      query.status = status;
    }

    if (upcoming) {
      query.scheduledAt = { $gte: new Date() };
      query.status = "scheduled";
    }

    const sessions = await Session.find(query)
      .populate("mentorId", "name email photoUrl")
      .populate("menteeId", "name email photoUrl")
      .sort({ scheduledAt: upcoming ? 1 : -1 })
      .lean();

    return NextResponse.json({ sessions });
  } catch (error: any) {
    console.error("Get sessions error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/sessions - Create new session
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { mentorId, menteeId, scheduledAt, duration, topic, notes } =
      await req.json();

    // Validate required fields
    if (!mentorId || !menteeId || !scheduledAt || !topic) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify user is either mentor or mentee
    if (
      session.user.id !== mentorId.toString() &&
      session.user.id !== menteeId.toString()
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await dbConnect();

    // Create session
    const newSession = await Session.create({
      mentorId,
      menteeId,
      scheduledAt: new Date(scheduledAt),
      duration: duration || 30,
      topic,
      notes,
      status: "scheduled",
    });

    const populatedSession = await Session.findById(newSession._id)
      .populate("mentorId", "name email photoUrl")
      .populate("menteeId", "name email photoUrl")
      .lean();

    return NextResponse.json(
      { session: populatedSession, message: "Session created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create session error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
