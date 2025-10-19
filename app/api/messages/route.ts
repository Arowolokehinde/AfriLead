import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import Message from "@/models/Message";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET /api/messages - Get messages for current user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const otherUserId = searchParams.get("userId");
    const conversationsOnly = searchParams.get("conversations") === "true";

    if (conversationsOnly) {
      // Get unique conversations
      const messages = await Message.aggregate([
        {
          $match: {
            $or: [
              { senderId: session.user.id },
              { receiverId: session.user.id },
            ],
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $group: {
            _id: {
              $cond: [
                { $eq: ["$senderId", session.user.id] },
                "$receiverId",
                "$senderId",
              ],
            },
            lastMessage: { $first: "$$ROOT" },
            unreadCount: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $eq: ["$receiverId", session.user.id] },
                      { $eq: ["$read", false] },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "otherUser",
          },
        },
        {
          $unwind: "$otherUser",
        },
        {
          $project: {
            otherUser: {
              _id: 1,
              name: 1,
              email: 1,
              photoUrl: 1,
            },
            lastMessage: {
              content: 1,
              createdAt: 1,
              senderId: 1,
            },
            unreadCount: 1,
          },
        },
        {
          $sort: { "lastMessage.createdAt": -1 },
        },
      ]);

      return NextResponse.json({ conversations: messages });
    }

    if (otherUserId) {
      // Get conversation with specific user
      const messages = await Message.find({
        $or: [
          { senderId: session.user.id, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: session.user.id },
        ],
      })
        .sort({ createdAt: 1 })
        .lean();

      // Mark messages as read
      await Message.updateMany(
        {
          senderId: otherUserId,
          receiverId: session.user.id,
          read: false,
        },
        {
          read: true,
          readAt: new Date(),
        }
      );

      return NextResponse.json({ messages });
    }

    return NextResponse.json(
      { error: "Please specify userId or set conversations=true" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Get messages error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/messages - Send new message
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { receiverId, content } = await req.json();

    if (!receiverId || !content) {
      return NextResponse.json(
        { error: "Receiver ID and content are required" },
        { status: 400 }
      );
    }

    if (content.length > 2000) {
      return NextResponse.json(
        { error: "Message cannot exceed 2000 characters" },
        { status: 400 }
      );
    }

    await dbConnect();

    const message = await Message.create({
      senderId: session.user.id,
      receiverId,
      content,
    });

    return NextResponse.json(
      { message, message: "Message sent successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Send message error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
