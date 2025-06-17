import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Invalid file type. Please upload JPEG, PNG, GIF, or WebP images only.",
        },
        { status: 400 }
      );
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        {
          error: "File size too large. Maximum size is 5MB.",
        },
        { status: 400 }
      );
    }

    // Generate a unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const fileExtension = file.name.split(".").pop();
    const fileName = `blog-${timestamp}-${randomString}.${fileExtension}`;

    // For now, we'll return a placeholder URL with proper dimensions
    // In a real implementation, you would upload to a cloud service like AWS S3, Cloudinary, etc.
    // Example implementations:
    // - AWS S3: Use AWS SDK to upload the file
    // - Cloudinary: Use Cloudinary SDK to upload and transform
    // - Local storage: Save to public folder and return local URL

    // Simulate file upload delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Create a more realistic placeholder that represents the uploaded image
    const width = 800;
    const height = 450;
    const mockUrl = `https://picsum.photos/${width}/${height}?random=${timestamp}`;

    return NextResponse.json({
      link: mockUrl,
      success: true,
      fileName: fileName,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
