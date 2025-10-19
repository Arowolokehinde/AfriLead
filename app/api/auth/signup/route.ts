import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, country, role } = await req.json();

    // Validate input
    if (!name || !email || !password || !country || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Validate role
    if (!['mentor', 'mentee', 'both'].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      country,
      role,
    });

    // Return user without password
    const userResponse = {
      id: String(user._id),
      name: user.name,
      email: user.email,
      role: user.role,
      country: user.country,
    };

    return NextResponse.json(
      { user: userResponse, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);

    // Provide more specific error messages
    let errorMessage = "Internal server error";

    if (error.message?.includes('ETIMEOUT') || error.message?.includes('querySrv')) {
      errorMessage = "Database connection timeout. Please ensure MongoDB Atlas IP whitelist includes your IP address (0.0.0.0/0 for testing), or the cluster is running.";
    } else if (error.message?.includes('Authentication failed')) {
      errorMessage = "Database authentication failed. Please check your MongoDB credentials.";
    } else if (error.code === 11000) {
      errorMessage = "User with this email already exists";
    } else if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
