import { NextRequest, NextResponse } from "next/server";

import connectToDB from "@/lib/connectToDB";
import Todo from "@/models/todo";
import User from "@/models/user";

export async function POST(request: Request) {
  const { title, description, email } = await request.json();
  console.log(title, description, email);
  if (!title || !description || !email) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    await connectToDB();
    const todo = new Todo({ title, description, email });
    await todo.save();
    return NextResponse.json(
      { message: "Todo add successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  await connectToDB();
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 400 });
  }
  const todos = await Todo.find({ email });
  return NextResponse.json({ data: todos });
}
