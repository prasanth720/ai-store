import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name } = await req.json();

  // Mock validation
  if (!name) {
    return NextResponse.json({
      success: false,
      message: "Name required",
    });
  }

  // Mock user + token
  return NextResponse.json({
    success: true,
    token: "mock-token-123",
    user: {
      id: "1",
      name,
    },
  });
}