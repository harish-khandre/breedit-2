import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/user-from-server";
import { uploadFileToS3 } from "@/lib/upload-image";

export async function POST(req: Request) {
  const formData = await req.formData();
  const image = formData.get("image");
  const petName = formData.get("petName");
  const age = formData.get("age");
  const breed = formData.get("breed");
  const gender = formData.get("gender");
  const about = formData.get("about");

  if (!(image instanceof File)) {
    return NextResponse.json({ error: "File not found" });
  }

  const img = await uploadFileToS3(image);

  if (!img) {
    return NextResponse.json({ error: "Failed to upload image to S3" });
  }

  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "User not found" });
  }

  const userId = user.id;

  if (!userId) {
    return NextResponse.json({ error: "User id not found" });
  }

  try {
    await db.pet.create({
      data: {
        userId: userId as string,
        petName: petName as string,
        age: age as string,
        about: about as string,
        breed: breed as string,
        gender: gender as string,
        image: img as string,
      },
    });

    return NextResponse.json({ success: "Form submitted!" });
  } catch (error) {
    console.error("Error storing data :", error);
    return NextResponse.json({ error: "Failed to register" });
  }
}
