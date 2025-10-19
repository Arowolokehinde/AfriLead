import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import Session from "@/models/Session";
import MentorProfile from "@/models/MentorProfile";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET /api/sessions/[id] - Get specific session
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const sessionData = await Session.findById(params.id)
      .populate("mentorId", "name email photoUrl country")
      .populate("menteeId", "name email photoUrl country")
      .lean();

    if (!sessionData) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Verify user is part of this session
    if (
      sessionData.mentorId._id.toString() !== session.user.id &&
      sessionData.menteeId._id.toString() !== session.user.id
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.json({ session: sessionData });
  } catch (error: any) {
    console.error("Get session error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH /api/sessions/[id] - Update session
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updates = await req.json();

    await dbConnect();

    const sessionData = await Session.findById(params.id);

    if (!sessionData) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Verify user is part of this session
    if (
      sessionData.mentorId.toString() !== session.user.id &&
      sessionData.menteeId.toString() !== session.user.id
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Handle completion
    if (updates.status === "completed") {
      sessionData.status = "completed";
      sessionData.completedAt = new Date();

      if (updates.rating) {
        sessionData.rating = updates.rating;
      }

      if (updates.feedback) {
        sessionData.feedback = updates.feedback;
      }

      // Update mentor's session count and rating
      if (updates.rating) {
        const mentorProfile = await MentorProfile.findOne({
          userId: sessionData.mentorId,
        });

        if (mentorProfile) {
          const totalSessions = mentorProfile.sessionsCompleted + 1;
          const currentRating = mentorProfile.rating || 0;
          const newRating =
            (currentRating * mentorProfile.sessionsCompleted + updates.rating) /
            totalSessions;

          mentorProfile.sessionsCompleted = totalSessions;
          mentorProfile.rating = newRating;
          await mentorProfile.save();
        }
      }
    } else {
      // Update other fields
      Object.assign(sessionData, updates);
    }

    await sessionData.save();

    const updatedSession = await Session.findById(params.id)
      .populate("mentorId", "name email photoUrl country")
      .populate("menteeId", "name email photoUrl country")
      .lean();

    return NextResponse.json({
      session: updatedSession,
      message: "Session updated successfully",
    });
  } catch (error: any) {
    console.error("Update session error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/sessions/[id] - Cancel session
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const sessionData = await Session.findById(params.id);

    if (!sessionData) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Verify user is part of this session
    if (
      sessionData.mentorId.toString() !== session.user.id &&
      sessionData.menteeId.toString() !== session.user.id
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    sessionData.status = "cancelled";
    await sessionData.save();

    return NextResponse.json({ message: "Session cancelled successfully" });
  } catch (error: any) {
    console.error("Cancel session error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
