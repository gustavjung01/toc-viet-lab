import { NextRequest, NextResponse } from "next/server";
import { getUploadUrl } from "@/lib/r2/client";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { key, contentType } = await req.json();
  if (!key || !contentType) {
    return NextResponse.json({ error: "Missing key or contentType" }, { status: 400 });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(contentType)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  try {
    const uploadUrl = await getUploadUrl(key, contentType);
    return NextResponse.json({ uploadUrl, key });
  } catch {
    return NextResponse.json({ error: "Failed to generate upload URL" }, { status: 500 });
  }
}
