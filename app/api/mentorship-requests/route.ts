import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import MentorshipRequest from "@/models/MentorshipRequest";
import User from "@/models/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET /api/mentorship-requests - Get requests for current user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // 'sent' or 'received'
    const status = searchParams.get("status");

    let query: any = {};

    if (type === "sent") {
      query.menteeId = session.user.id;
    } else if (type === "received") {
      query.mentorId = session.user.id;
    } else {
      // Get both sent and received
      query.$or = [
        { menteeId: session.user.id },
        { mentorId: session.user.id },
      ];
    }

    if (status) {
      query.status = status;
    }

    const requests = await MentorshipRequest.find(query)
      .populate("mentorId", "name email country photoUrl")
      .populate("menteeId", "name email country photoUrl")
      .sort({ requestDate: -1 })
      .lean();

    return NextResponse.json({ requests });
  } catch (error: any) {
    console.error("Get mentorship requests error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/mentorship-requests - Create new mentorship request
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { mentorId, message } = await req.json();

    if (!mentorId) {
      return NextResponse.json(
        { error: "Mentor ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if request already exists
    const existingRequest = await MentorshipRequest.findOne({
      mentorId,
      menteeId: session.user.id,
    });

    if (existingRequest) {
      return NextResponse.json(
        { error: "Request already exists" },
        { status: 409 }
      );
    }

    // Create new request
    const request = await MentorshipRequest.create({
      mentorId,
      menteeId: session.user.id,
      message,
      status: "pending",
    });

    const populatedRequest = await MentorshipRequest.findById(request._id)
      .populate("mentorId", "name email country photoUrl")
      .populate("menteeId", "name email country photoUrl")
      .lean();

    return NextResponse.json(
      { request: populatedRequest, message: "Request sent successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create mentorship request error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
