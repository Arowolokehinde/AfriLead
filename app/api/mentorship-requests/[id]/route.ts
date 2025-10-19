import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import MentorshipRequest from "@/models/MentorshipRequest";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// PATCH /api/mentorship-requests/[id] - Update request status
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await req.json();

    if (!["accepted", "rejected", "cancelled"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    await dbConnect();

    const request = await MentorshipRequest.findById(params.id);

    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    // Verify user is authorized to update this request
    const isMentor = request.mentorId.toString() === session.user.id;
    const isMentee = request.menteeId.toString() === session.user.id;

    if (!isMentor && !isMentee) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Only mentor can accept/reject, only mentee can cancel
    if ((status === "accepted" || status === "rejected") && !isMentor) {
      return NextResponse.json(
        { error: "Only mentor can accept or reject requests" },
        { status: 403 }
      );
    }

    if (status === "cancelled" && !isMentee) {
      return NextResponse.json(
        { error: "Only mentee can cancel requests" },
        { status: 403 }
      );
    }

    request.status = status;
    request.responseDate = new Date();
    await request.save();

    const updatedRequest = await MentorshipRequest.findById(params.id)
      .populate("mentorId", "name email country photoUrl")
      .populate("menteeId", "name email country photoUrl")
      .lean();

    return NextResponse.json({
      request: updatedRequest,
      message: `Request ${status} successfully`,
    });
  } catch (error: any) {
    console.error("Update mentorship request error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/mentorship-requests/[id] - Delete request
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

    const request = await MentorshipRequest.findById(params.id);

    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    // Verify user owns this request
    if (
      request.mentorId.toString() !== session.user.id &&
      request.menteeId.toString() !== session.user.id
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await MentorshipRequest.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Request deleted successfully" });
  } catch (error: any) {
    console.error("Delete mentorship request error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
