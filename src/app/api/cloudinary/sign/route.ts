import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { signUpload } from "@/lib/cloudinary";

// Returns a signature so the admin can upload directly to Cloudinary.
export async function POST() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const timestamp = Math.round(Date.now() / 1000);
  const folder = "ceylon";
  const signature = signUpload({ timestamp, folder });

  return NextResponse.json({
    signature,
    timestamp,
    folder,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  });
}
